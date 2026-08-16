import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Working with Dates and Times — Python | Chaduvuko',
  description:
    'The datetime module in depth — creating and formatting dates, naive vs timezone-aware datetimes, zoneinfo for real US timezones, and a scheduling worked example.',
}

const C = '#4285f4'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

export default function DatesTimes() {
  return (
    <LearnLayout
      title="Working with Dates and Times"
      description="The datetime module in depth — creating and formatting dates, naive vs timezone-aware datetimes, zoneinfo, and a real scheduling example."
      section="Python — Module 33"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why This Module Deserves Real Care" />
        <SectionTitle>The Module Every Application Needs, and Everyone Gets Wrong Once</SectionTitle>

        <Para>
          Dates and times feel simple until they are not. Nearly every production application touches
          them somewhere — a timestamp on a database row, a "remind me in 3 days" feature, a report that
          needs to say "this happened at 9am Eastern" correctly regardless of where the server
          physically runs. And nearly every engineer, at some point, ships a date/time bug that only
          shows up for users in a specific timezone, or only around a Daylight Saving Time transition, or
          only when a server's clock is set to UTC instead of local time. This module exists to get you
          past that first bug before it happens in production, not after.
        </Para>

        <Para>
          Python's standard library ships a genuinely solid toolkit for this: the <code>datetime</code>{' '}
          module for representing points in time and durations, and — since Python 3.9 — the{' '}
          <code>zoneinfo</code> module for correct, IANA-database-backed timezone handling. This module
          builds both up from first principles, spends real time on the naive-vs-aware distinction
          (because it is the single biggest source of real bugs), and ends with a worked scheduling
          example across US timezones.
        </Para>

        <CodeBox label="A first look at the toolkit">{`from datetime import date, time, datetime, timedelta

today = date.today()                    # just a calendar date, no time component
now = datetime.now()                    # date AND time, but "naive" — see Part 04
one_week_later = today + timedelta(days=7)   # date arithmetic, covered in Part 06

print(today)              # 2026-08-13
print(now)                # 2026-08-13 09:41:02.118273
print(one_week_later)     # 2026-08-20`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Four Core Classes" />
        <SectionTitle>date, time, datetime, and timedelta</SectionTitle>

        <Para>
          The <code>datetime</code> module provides four classes that cover almost everything you will
          need. It is worth being precise about what each one represents, since mixing them up (for
          example, trying to add a <code>time</code> object directly to a <code>date</code> object) is a
          common early mistake.
        </Para>

        <CodeBox label="date — a calendar date, with no time-of-day component">{`from datetime import date

launch_day = date(2026, 8, 13)     # year, month, day
print(launch_day)                  # 2026-08-13
print(launch_day.year, launch_day.month, launch_day.day)   # 2026 8 13
print(launch_day.weekday())        # 3 — Monday is 0, so 3 is Thursday`}</CodeBox>

        <CodeBox label="time — a time-of-day, with no date component">{`from datetime import time

standup = time(9, 30)              # hour, minute (seconds and microseconds default to 0)
print(standup)                     # 09:30:00
print(standup.hour, standup.minute)   # 9 30`}</CodeBox>

        <CodeBox label="datetime — a date AND a time-of-day combined">{`from datetime import datetime

meeting = datetime(2026, 8, 13, 9, 30, 0)   # year, month, day, hour, minute, second
print(meeting)                              # 2026-08-13 09:30:00

# datetime.now() and datetime.today() both give the CURRENT date and time
print(datetime.now())`}</CodeBox>

        <CodeBox label="timedelta — a DURATION, not a point in time">{`from datetime import timedelta

one_week = timedelta(days=7)
ninety_minutes = timedelta(hours=1, minutes=30)

print(one_week)          # 7 days, 0:00:00
print(ninety_minutes)    # 1:30:00`}</CodeBox>

        <Para>
          The distinction to hold onto: <code>date</code>, <code>time</code>, and{' '}
          <code>datetime</code> represent a specific <strong>point</strong> — a place on the calendar or
          clock. <code>timedelta</code> represents a <strong>span</strong> — an amount of elapsed time,
          with no fixed starting point of its own. You will combine them constantly: a point plus a
          span gives you another point, covered fully in Part 06.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Formatting and Parsing" />
        <SectionTitle>strftime and strptime — Genuinely Fiddly, Worth Doing Properly</SectionTitle>

        <Para>
          Turning a <code>datetime</code> object into a specific text format, and turning text back into
          a <code>datetime</code> object, are two of the most common date/time operations in real code —
          and also where most people reach for the documentation every single time, because the format
          codes are dense and easy to mix up. Two methods to know: <code>strftime</code> ("string format
          time" — object to string) and <code>strptime</code> ("string parse time" — string to object).
        </Para>

        <CodeBox label="strftime — datetime object to formatted string">{`from datetime import datetime

now = datetime(2026, 8, 13, 14, 5, 9)

print(now.strftime("%Y-%m-%d"))              # "2026-08-13"
print(now.strftime("%m/%d/%Y"))              # "08/13/2026"
print(now.strftime("%B %d, %Y"))             # "August 13, 2026"
print(now.strftime("%A, %B %d"))             # "Thursday, August 13"
print(now.strftime("%I:%M %p"))              # "02:05 PM"
print(now.strftime("%Y-%m-%d %H:%M:%S"))     # "2026-08-13 14:05:09"`}</CodeBox>

        <CodeBox label="The format codes worth memorizing">{`%Y   4-digit year           2026
%y   2-digit year           26
%m   month, zero-padded     08
%d   day of month           13
%B   full month name        August
%b   abbreviated month      Aug
%A   full weekday name      Thursday
%a   abbreviated weekday    Thu
%H   hour, 24-hour clock    14
%I   hour, 12-hour clock    02
%M   minute, zero-padded    05
%S   second, zero-padded    09
%p   AM or PM               PM`}</CodeBox>

        <CodeBox label="strptime — string to datetime object (the reverse direction)">{`from datetime import datetime

# The format string must match the input text's shape EXACTLY, code for code
parsed = datetime.strptime("2026-08-13 14:05:09", "%Y-%m-%d %H:%M:%S")
print(parsed)              # datetime.datetime(2026, 8, 13, 14, 5, 9)
print(type(parsed))        # <class 'datetime.datetime'>

# A common real case — parsing a date users typed in a form
form_date = datetime.strptime("08/13/2026", "%m/%d/%Y")
print(form_date.date())    # 2026-08-13`}</CodeBox>

        <Callout type="warning">
          <strong>The format string in strptime must match the input exactly.</strong>{' '}
          <code>datetime.strptime(&quot;2026-08-13&quot;, &quot;%m/%d/%Y&quot;)</code> raises{' '}
          <code>ValueError: time data &apos;2026-08-13&apos; does not match format &apos;%m/%d/%Y&apos;</code>{' '}
          — the separators (dashes vs slashes) and field order both have to line up precisely with what
          is actually in the string, not what you assume it looks like. When parsing data from an
          external source, always confirm the exact format first rather than guessing.
        </Callout>

        <Para>
          A useful shortcut for the common ISO 8601 format specifically (<code>YYYY-MM-DDTHH:MM:SS</code>
          , the standard format used by most APIs and databases):{' '}
          <code>datetime.fromisoformat()</code> and <code>datetime.isoformat()</code> handle it without
          needing to spell out a format string at all.
        </Para>

        <CodeBox label="ISO format shortcuts — no format string needed">{`now = datetime(2026, 8, 13, 14, 5, 9)
print(now.isoformat())                              # "2026-08-13T14:05:09"

parsed = datetime.fromisoformat("2026-08-13T14:05:09")
print(parsed)                                         # datetime.datetime(2026, 8, 13, 14, 5, 9)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Naive vs Timezone-Aware" />
        <SectionTitle>The Distinction Behind the Majority of Real Production Date Bugs</SectionTitle>

        <Para>
          A <strong>naive</strong> <code>datetime</code> has no timezone information attached — it is
          just a collection of numbers (year, month, day, hour, minute, second) with no notion of{' '}
          <em>where on Earth</em> or relative to what reference point those numbers apply. A{' '}
          <strong>timezone-aware</strong> <code>datetime</code> carries that information explicitly.{' '}
          <code>datetime.now()</code>, used casually in the first example of this module, returns a{' '}
          naive datetime — which is exactly why it deserves a section of its own here.
        </Para>

        <CodeBox label="Naive datetimes have no idea what timezone they represent">{`from datetime import datetime

naive = datetime.now()
print(naive)              # 2026-08-13 09:41:02.118273
print(naive.tzinfo)       # None — no timezone attached at all

# This "9:41" could be Eastern time, Pacific time, UTC, or anything else —
# the datetime object itself contains no information that says which.`}</CodeBox>

        <Para>
          Here is why this becomes a real bug, not just a technicality. Imagine a scheduling system
          storing "reminder due at 2026-08-13 09:00:00" as a naive datetime, on a server configured to
          run in UTC. A user in Denver (Mountain time, UTC−6 during Daylight Saving Time) expects their
          9am reminder to fire at 9am <em>their</em> local time — but the naive datetime has no way to
          express that distinction. Depending on how the comparison is written elsewhere in the code, the
          reminder can silently fire six hours early or late, and nothing about the code itself signals
          that anything is wrong — it runs without error, it just produces the wrong answer.
        </Para>

        <CodeBox label="Making a datetime timezone-aware">{`from datetime import datetime, timezone

aware_utc = datetime.now(timezone.utc)
print(aware_utc)           # 2026-08-13 15:41:02.118273+00:00
print(aware_utc.tzinfo)    # UTC — no longer None`}</CodeBox>

        <Callout type="warning">
          <strong>Naive and aware datetimes cannot be compared or subtracted from each other.</strong>{' '}
          <code>naive_dt - aware_dt</code> raises{' '}
          <code>TypeError: can&apos;t subtract offset-naive and offset-aware datetimes</code>. Python
          refuses to guess what timezone the naive one is supposed to represent — which is a genuine
          safety feature, not an inconvenience, since silently guessing wrong is exactly the class of bug
          described above.
        </Callout>

        <Para>
          The practical rule most production codebases adopt: store and compute with{' '}
          <strong>timezone-aware datetimes internally, in UTC</strong>, and only convert to a specific
          local timezone at the moment you display something to a user or accept input from one. Part 05
          covers exactly how to do that conversion correctly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — zoneinfo and Real US Timezones" />
        <SectionTitle>Working With Actual Timezones — The Modern Standard-Library Way</SectionTitle>

        <Para>
          Since Python 3.9, the standard library includes <code>zoneinfo</code>, which gives you access
          to the full IANA time zone database — the same authoritative source used across most modern
          software. Before 3.9, this required the third-party <code>pytz</code> package, which you will
          still see in a lot of legacy code and older tutorials; <code>zoneinfo</code> is the modern
          replacement and the one to reach for in new code.
        </Para>

        <CodeBox label="Attaching a real timezone with zoneinfo">{`from datetime import datetime
from zoneinfo import ZoneInfo

denver_time = datetime(2026, 8, 13, 9, 0, 0, tzinfo=ZoneInfo("America/Denver"))
print(denver_time)             # 2026-08-13 09:00:00-06:00
print(denver_time.tzinfo)      # America/Denver`}</CodeBox>

        <CodeBox label="Common US timezone identifiers">{`America/New_York       Eastern (handles EST/EDT switching automatically)
America/Chicago        Central
America/Denver         Mountain
America/Los_Angeles    Pacific
America/Anchorage      Alaska
Pacific/Honolulu       Hawaii (no Daylight Saving Time observed)`}</CodeBox>

        <Para>
          Notice these are named after cities and regions, not fixed offsets like "UTC-5" — this is
          deliberate and important. A fixed offset cannot correctly represent Daylight Saving Time
          transitions, but <code>America/New_York</code> automatically knows to be UTC−5 in the winter
          and UTC−4 in the summer, because the IANA database encodes the actual historical and current
          rules for that region, including exactly when the transitions happen each year.
        </Para>

        <CodeBox label="Converting between timezones — the operation you'll use constantly">{`from datetime import datetime
from zoneinfo import ZoneInfo

# A meeting scheduled in Eastern time
meeting_eastern = datetime(2026, 8, 13, 13, 0, tzinfo=ZoneInfo("America/New_York"))

# What time is that for a Denver-based attendee?
meeting_denver = meeting_eastern.astimezone(ZoneInfo("America/Denver"))
print(meeting_denver)     # 2026-08-13 11:00:00-06:00 — 11am Mountain

# And in UTC, for storing in a database?
meeting_utc = meeting_eastern.astimezone(ZoneInfo("UTC"))
print(meeting_utc)        # 2026-08-13 17:00:00+00:00`}</CodeBox>

        <Callout type="tip">
          <strong>pytz vs zoneinfo:</strong> If you encounter <code>pytz</code> in an existing codebase,
          the biggest gotcha is that <code>pytz</code> timezones generally should not be passed directly
          to a <code>datetime</code> constructor's <code>tzinfo</code> argument — they require a
          separate <code>.localize()</code> call to attach correctly, an easy trap for anyone used to{' '}
          <code>zoneinfo</code>&apos;s simpler API. For new code, <code>zoneinfo</code> avoids this
          entirely and needs no external dependency, since it ships in the standard library from Python
          3.9 onward.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Date Arithmetic" />
        <SectionTitle>timedelta — Adding, Subtracting, and Measuring Elapsed Time</SectionTitle>

        <Para>
          You met <code>timedelta</code> briefly in Part 02. It supports the arithmetic operators
          directly, which is what makes date math in Python genuinely pleasant rather than a manual
          calendar-counting exercise.
        </Para>

        <CodeBox label="Adding and subtracting durations">{`from datetime import date, datetime, timedelta

today = date(2026, 8, 13)
print(today + timedelta(days=10))     # 2026-08-23
print(today - timedelta(weeks=2))     # 2026-07-30

deadline = datetime(2026, 8, 13, 17, 0)
print(deadline + timedelta(hours=6, minutes=30))   # 2026-08-13 23:30:00`}</CodeBox>

        <CodeBox label="Subtracting two datetimes gives you a timedelta">{`start = datetime(2026, 8, 13, 9, 0)
end = datetime(2026, 8, 13, 17, 30)

elapsed = end - start
print(elapsed)                # 8:30:00
print(elapsed.total_seconds())   # 30600.0 — useful for logging or comparisons
print(type(elapsed))          # <class 'datetime.timedelta'>`}</CodeBox>

        <SubTitle>Calculating business days — a genuinely common real task</SubTitle>

        <Para>
          Adding a fixed number of calendar days is straightforward, but "5 business days from now" is
          a common real requirement that the standard library does not provide directly — it is worth
          seeing how naturally it builds on what you already have.
        </Para>

        <CodeBox label="Adding N business days, skipping weekends">{`from datetime import date, timedelta

def add_business_days(start_date, business_days):
    current = start_date
    added = 0
    while added < business_days:
        current += timedelta(days=1)
        if current.weekday() < 5:   # Monday=0 ... Friday=4; Saturday=5, Sunday=6
            added += 1
    return current

order_date = date(2026, 8, 13)          # a Thursday
ship_by = add_business_days(order_date, 5)
print(ship_by)                          # 2026-08-20 — skips the weekend correctly`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Timestamps" />
        <SectionTitle>Converting Between Unix Timestamps and datetime Objects</SectionTitle>

        <Para>
          A <strong>Unix timestamp</strong> (or "epoch time") is a single number: the count of seconds
          elapsed since January 1, 1970, 00:00:00 UTC. It shows up constantly in APIs, logs, and
          databases, precisely because a single number is unambiguous and easy to store, sort, and
          compare — no format-string parsing required.
        </Para>

        <CodeBox label="datetime to timestamp, and back">{`from datetime import datetime, timezone

now = datetime.now(timezone.utc)
ts = now.timestamp()
print(ts)                              # 1786721234.118273 (an example value)

# Converting a timestamp back to a datetime
restored = datetime.fromtimestamp(ts, tz=timezone.utc)
print(restored)                        # matches "now" above`}</CodeBox>

        <Callout type="warning">
          <strong>datetime.fromtimestamp() without a tz argument returns a naive datetime in the local
          system timezone</strong> — a common source of confusion when the same code runs on a laptop
          set to Mountain time and a production server set to UTC, silently producing different-looking
          results for the identical timestamp number. Always pass{' '}
          <code>tz=timezone.utc</code> (or another explicit zone) unless you specifically intend local-
          system-timezone behaviour.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Worked Example" />
        <SectionTitle>Scheduling Logic for a US-Wide Service</SectionTitle>

        <Para>
          Here is a realistic worked example pulling together naive-vs-aware, <code>zoneinfo</code>,
          and formatting: a notification scheduler for a fictional nationwide service that needs to
          send a "your appointment is tomorrow at 9am" reminder correctly, regardless of which US
          timezone the recipient is in.
        </Para>

        <CodeBox label="Scheduling a reminder correctly across timezones">{`from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

def schedule_reminder(appointment_local_time, user_timezone, hours_before=24):
    """
    appointment_local_time: a naive datetime representing the appointment,
                             in the USER's own local time
    user_timezone: an IANA zone string, e.g. "America/Denver"
    """
    # Step 1 — attach the user's actual timezone to their local appointment time
    appointment_aware = appointment_local_time.replace(tzinfo=ZoneInfo(user_timezone))

    # Step 2 — convert to UTC immediately, for internal storage and comparison
    appointment_utc = appointment_aware.astimezone(ZoneInfo("UTC"))

    # Step 3 — compute when the reminder should fire, still in UTC
    reminder_utc = appointment_utc - timedelta(hours=hours_before)

    return {
        "appointment_utc": appointment_utc,
        "reminder_utc": reminder_utc,
        "reminder_local_display": reminder_utc.astimezone(ZoneInfo(user_timezone)),
    }

# A user in Denver with a 9am appointment on 2026-08-14
result = schedule_reminder(
    datetime(2026, 8, 14, 9, 0),
    "America/Denver",
)

print(result["appointment_utc"])           # 2026-08-14 15:00:00+00:00
print(result["reminder_utc"])              # 2026-08-13 15:00:00+00:00
print(result["reminder_local_display"])    # 2026-08-13 09:00:00-06:00 — 9am the day before, Denver time`}</CodeBox>

        <Para>
          Notice the pattern the function follows: attach the correct local timezone as early as
          possible, immediately convert to UTC for any internal storage or arithmetic, and only convert
          back to a local timezone at the very last step, for display. This "convert to UTC at the
          boundary, work in UTC internally" pattern is exactly the practical rule from the end of Part 04,
          applied to a real feature.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>An Austin Scheduling Startup&apos;s Daylight Saving Time Bug</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Appointment-scheduling startup, Austin · Production incident
          </div>

          <Para>
            A scheduling startup lets small medical and dental offices manage patient appointments. An
            early version of their reminder system stores each appointment's local time as a naive
            datetime, plus a separate UTC offset column captured at the moment the appointment was
            booked — a design decision made under deadline pressure, reasoning that "we'll just apply the
            saved offset later."
          </Para>

          <SubSubTitle>What breaks, the weekend Daylight Saving Time ends</SubSubTitle>

          <Para>
            An appointment booked in July for a date in November was saved with July's UTC offset —
            Central Daylight Time, UTC−5. By the time November arrives, Central Standard Time (UTC−6) is
            in effect, but the stored offset never updated, because a fixed offset captured once is not
            the same thing as a timezone. Every reminder for an appointment spanning the Daylight Saving
            Time transition fires exactly one hour off — patients start calling asking why their
            reminder said 9am but the front desk says their appointment is at 10am.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team replaces the fixed-offset column entirely with an IANA zone name — exactly the{' '}
            <code>&quot;America/Chicago&quot;</code>-style string from Part 05 — stored alongside a UTC
            timestamp. Because <code>zoneinfo</code> encodes the actual Daylight Saving Time transition
            rules for that region, converting <code>America/Chicago</code> at any future date
            automatically applies the correct offset for that specific date, without the application
            needing to track transition dates itself. This is precisely why Part 05 emphasized using
            named zones like <code>America/Denver</code> rather than a fixed numeric offset — a fixed
            offset is only ever correct for the exact moment it was captured.
          </Para>

          <Para>
            The broader lesson, echoed across most real date/time incidents: a UTC offset is a snapshot,
            valid for one instant; a timezone name is a rule, valid indefinitely into the future. Storing
            the snapshot when you needed the rule is a subtle mistake that will not surface until the
            next Daylight Saving Time transition proves it wrong.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Dates and Times</SectionTitle>

        {[
          {
            wrong: '"datetime.now() gives me a reliable, universal timestamp"',
            right: 'datetime.now() returns a NAIVE datetime with no timezone attached, reflecting whatever timezone the local system clock happens to be set to. It is not universal or reliable across machines — a server in UTC and a laptop in Mountain time produce very different-looking "now" values for the same instant. Use datetime.now(timezone.utc) for a value that means the same thing everywhere.',
          },
          {
            wrong: '"A UTC offset (like -06:00) is the same thing as a timezone"',
            right: 'A fixed offset is only correct for one specific moment. A real timezone (like America/Denver) is a RULE that can produce different offsets at different times of year, because of Daylight Saving Time. Storing a captured offset instead of a zone name is exactly the bug in the Real World example above.',
          },
          {
            wrong: '"pytz is still the standard way to handle timezones in Python"',
            right: 'pytz was the standard before Python 3.9. Since 3.9, the standard library\'s own zoneinfo module covers the same IANA timezone database with a simpler API and no external dependency. You will still see pytz in legacy code, but new code should use zoneinfo.',
          },
          {
            wrong: '"strptime can figure out the format of a date string automatically"',
            right: 'strptime requires an exact format string that matches the input text precisely — it does not guess or infer the layout. A mismatched format string raises a ValueError immediately rather than parsing something close enough. For flexible parsing of an unknown format, a third-party library like dateutil exists, but it is not part of the standard library.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: 'var(--red)',
              marginBottom: 8, fontFamily: 'var(--font-mono)',
            }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between a naive and a timezone-aware datetime?',
            a: 'A naive datetime has no timezone information — just numbers for year, month, day, hour, minute, second, with no indication of where on Earth or relative to what reference they apply. A timezone-aware datetime carries an explicit tzinfo, unambiguously identifying the instant in time it represents. Naive and aware datetimes cannot be compared or subtracted directly — Python raises a TypeError rather than guessing which timezone the naive one is meant to represent.',
          },
          {
            q: 'Why is it better to store a timezone name like "America/Denver" rather than a fixed UTC offset?',
            a: 'A fixed offset (like -06:00) is only correct for the exact moment it was captured, because Daylight Saving Time changes the correct offset for most US timezones twice a year. A named timezone from the IANA database encodes the actual historical and future transition rules for that region, so converting it correctly applies whichever offset is valid for any given date — automatically, without the application tracking transition dates itself.',
          },
          {
            q: 'What is the difference between strftime and strptime?',
            a: 'strftime ("string format time") converts a datetime object INTO a formatted string, using format codes like %Y, %m, %d. strptime ("string parse time") does the reverse — it parses a string INTO a datetime object, using a format string that must match the input text\'s exact layout, or it raises a ValueError.',
          },
          {
            q: 'What is a Unix timestamp, and why is it commonly used in APIs and databases?',
            a: 'A Unix timestamp is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC — a single unambiguous number representing a point in time, independent of any timezone or formatting convention. It is easy to store, sort, and compare without any string parsing, which is exactly why it shows up constantly in APIs, logs, and database columns.',
          },
          {
            q: 'What is the practical rule most production systems follow for storing and working with datetimes internally?',
            a: 'Store and compute with timezone-aware datetimes in UTC internally, and convert to a specific local timezone only at the boundary — when displaying to a user or accepting input from one. This avoids ambiguity throughout the system\'s internal logic and confines timezone-conversion complexity to the smallest possible surface area, exactly as shown in the scheduling worked example above.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Date/Time Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using datetime.now() and assuming the result is timezone-independent',
            a: 'datetime.now() returns a naive datetime in whatever timezone the local machine is set to. Use datetime.now(timezone.utc) when you need a value that means the same thing regardless of where the code runs.',
          },
          {
            q: 'Mixing naive and aware datetimes in the same comparison or subtraction',
            a: 'This raises TypeError: can\'t subtract offset-naive and offset-aware datetimes. Pick one approach for a given codebase — ideally aware datetimes throughout — and stay consistent rather than mixing the two.',
          },
          {
            q: 'Assuming strptime can parse any reasonable-looking date string',
            a: 'The format string passed to strptime must match the input exactly, including separators and field order. A date like "13-08-2026" with the format "%m/%d/%Y" raises a ValueError immediately rather than a best-effort parse.',
          },
          {
            q: 'Storing a captured UTC offset instead of a timezone name',
            a: 'As shown in the Real World example, a fixed offset is only valid for the instant it was captured and does not account for Daylight Saving Time transitions. Store an IANA zone name (like "America/Chicago") alongside a UTC timestamp instead.',
          },
          {
            q: 'Forgetting that weekday() and isoweekday() use different numbering',
            a: 'date.weekday() returns Monday=0 through Sunday=6. date.isoweekday() returns Monday=1 through Sunday=7. Mixing them up silently shifts every calculation that checks for a specific day by one, without raising any error.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit With Dates and Times — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: can't subtract offset-naive and offset-aware datetimes`,
            cause: 'One datetime has a tzinfo attached and the other does not, and code tried to compare or subtract them directly.',
            fix: 'Make both datetimes consistently naive or consistently aware before comparing. The safer long-term fix is converting the naive one to aware, typically by attaching UTC or the appropriate local zone with .replace(tzinfo=...) or ZoneInfo.',
          },
          {
            error: `ValueError: time data '2026-08-13' does not match format '%m/%d/%Y'`,
            cause: 'The format string passed to strptime does not match the actual layout of the input string — different separators, different field order, or a different number of digits.',
            fix: 'Print or inspect the exact input string first, then write a format string that matches it code-for-code. For standard ISO 8601 strings, use datetime.fromisoformat() instead, which needs no format string at all.',
          },
          {
            error: `zoneinfo.ZoneInfoNotFoundError: 'No time zone found with key America/Denvr'`,
            cause: 'A typo in the IANA zone name string passed to ZoneInfo() — zone names are exact strings from the IANA database and are case-sensitive.',
            fix: 'Double-check the zone name against the IANA database (e.g. "America/Denver", not "America/Denvr" or "america/denver"). The zoneinfo.available_timezones() function can list all valid names.',
          },
          {
            error: `AttributeError: 'datetime.date' object has no attribute 'hour'`,
            cause: 'Code tried to access a time-of-day attribute (hour, minute, second) on a date object, which has no time-of-day component at all.',
            fix: 'Use a datetime object instead of a plain date object if you need both a calendar date and a time-of-day, or combine them explicitly with datetime.combine(some_date, some_time).',
          },
          {
            error: `OverflowError: date value out of range`,
            cause: 'Date arithmetic produced a date outside the range Python\'s datetime module can represent (year 1 through year 9999) — commonly from adding an unexpectedly large timedelta, often due to a units mistake (e.g. treating a value as days when it was actually meant as seconds).',
            fix: 'Double-check the units of any value passed into timedelta() — days, seconds, and the other keyword arguments are easy to confuse, especially when the value comes from user input or another system.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--red)', marginBottom: 12,
              background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px',
              lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'date, time, and datetime represent POINTS on the calendar/clock. timedelta represents a SPAN of elapsed time, with no fixed starting point of its own.',
        'strftime formats a datetime object into a string; strptime parses a string into a datetime object using a format string that must match the input exactly.',
        'A naive datetime has no timezone attached; a timezone-aware datetime does. datetime.now() returns naive by default — a common source of real production bugs.',
        'Naive and aware datetimes cannot be compared or subtracted directly — Python raises a TypeError rather than guessing.',
        'zoneinfo (standard library since Python 3.9) is the modern way to work with real IANA timezones like "America/Denver" — prefer it over the older third-party pytz for new code.',
        'A timezone name is a RULE that correctly accounts for Daylight Saving Time transitions; a captured UTC offset is only valid for the instant it was recorded. Store the name, not just the offset.',
        'The standard production pattern: store and compute with timezone-aware datetimes in UTC internally, and convert to a local timezone only at the display/input boundary.',
        'Unix timestamps (seconds since 1970-01-01 UTC) are a common, unambiguous way to represent a point in time in APIs and databases — convert with .timestamp() and datetime.fromtimestamp(ts, tz=...).',
        'timedelta supports direct arithmetic with date and datetime objects, and subtracting two datetimes yields a timedelta — this is how you build things like business-day calculations.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 34 covers multithreading and multiprocessing — the Global Interpreter Lock, when
          threads genuinely help despite it, and when you need real parallelism with separate processes
          instead.
        </p>
        <Link href="/learn/python/multithreading-multiprocessing" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 34 → Multithreading and Multiprocessing Basics
        </Link>
      </div>
    </LearnLayout>
  )
}
