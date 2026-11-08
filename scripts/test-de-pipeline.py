"""Exercise the exact local pipeline code embedded in the batch tutorial.

Receives that snippet on stdin from validate-de-workshops.ts. No cloud services
or third-party packages are used. The fixture schema is taken from the snippet.
"""
import ast
import copy
import sqlite3
import sys
from pathlib import Path
from tempfile import TemporaryDirectory


tree = ast.parse(sys.stdin.read())
namespace = {}
declarations = ast.Module(
    body=[node for node in tree.body if not isinstance(node, ast.With)],
    type_ignores=[],
)
exec(compile(declarations, "tutorial-pipeline", "exec"), namespace)
schema = next(
    node.args[0].value
    for node in ast.walk(tree)
    if isinstance(node, ast.Call)
    and isinstance(node.func, ast.Attribute)
    and node.func.attr == "executescript"
)
original_source = copy.deepcopy(namespace["source"])
run = namespace["run"]


def fresh(database=":memory:"):
    namespace["source"] = copy.deepcopy(original_source)
    connection = sqlite3.connect(database)
    connection.executescript(schema)
    return connection


def state(connection):
    return (
        connection.execute("SELECT COUNT(*) FROM audit").fetchone()[0],
        connection.execute("SELECT COUNT(*) FROM orders").fetchone()[0],
        connection.execute("SELECT seq FROM checkpoint").fetchone()[0],
    )


checks = 0
with fresh() as db:
    assert run(db) == 4
    assert state(db) == (4, 2, 4)
    checks += 1
    assert run(db) == 0
    assert state(db) == (4, 2, 4)
    checks += 1
db.close()

with fresh() as db:
    db.executescript("""
        CREATE TRIGGER fail_write BEFORE INSERT ON orders
        BEGIN SELECT RAISE(ABORT, 'injected write failure'); END;
    """)
    try:
        run(db)
        raise AssertionError("Injected failure was not raised")
    except sqlite3.IntegrityError:
        pass
    assert state(db) == (0, 0, 0), "Output, audit and checkpoint must all roll back"
    checks += 1
    db.execute("DROP TRIGGER fail_write")
    run(db)
    assert state(db) == (4, 2, 4)
    checks += 1
db.close()

with fresh() as db:
    run(db)
    namespace["source"].append({"seq": 5, "id": 9, "amount": 500, "status": "paid"})
    assert run(db) == 1
    assert state(db) == (5, 3, 5)
    assert db.execute("SELECT SUM(amount) FROM orders").fetchone()[0] == 850
    assert db.execute("SELECT accepted FROM audit WHERE seq=4").fetchone()[0] == 0
    checks += 1
db.close()

with fresh() as db:
    run(db)
    namespace["source"].append({"seq": 5, "id": 10, "amount": True, "status": "new"})
    run(db)
    assert state(db) == (5, 2, 5)
    assert db.execute("SELECT accepted FROM audit WHERE seq=5").fetchone()[0] == 0
    checks += 1
db.close()

with fresh() as db:
    namespace["source"] = []
    assert run(db) == 0
    assert state(db) == (0, 0, 0)
    checks += 1
db.close()

with TemporaryDirectory() as directory:
    location = str(Path(directory) / "persisted.sqlite")
    db = fresh(location)
    run(db)
    db.close()
    db = sqlite3.connect(location)
    assert state(db) == (4, 2, 4)
    assert run(db) == 0
    db.close()
    checks += 1

print(f"Local tutorial pipeline: {checks} recovery and correctness checks passed")
