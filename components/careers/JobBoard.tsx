'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CAREER_ROLES, CAREERS_POSTED } from '@/data/careers'

type SortKey = 'title' | 'subject'

export function JobBoard() {
  const [keyword, setKeyword] = useState('')
  const [subject, setSubject] = useState('all')
  const [sort, setSort] = useState<SortKey>('title')
  const [dir, setDir] = useState<'asc' | 'desc'>('asc')

  const subjects = useMemo(
    () => Array.from(new Set(CAREER_ROLES.map(role => role.subject))).sort((a, b) => a.localeCompare(b)),
    [],
  )

  const rows = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    const filtered = CAREER_ROLES.filter(role => {
      if (subject !== 'all' && role.subject !== subject) return false
      if (!query) return true
      return `${role.title} ${role.subject} ${role.summary}`.toLowerCase().includes(query)
    })
    const factor = dir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const left = sort === 'title' ? a.title : a.subject
      const right = sort === 'title' ? b.title : b.subject
      return left.localeCompare(right) * factor
    })
  }, [keyword, subject, sort, dir])

  function toggleSort(next: SortKey) {
    if (sort === next) setDir(current => (current === 'asc' ? 'desc' : 'asc'))
    else {
      setSort(next)
      setDir('asc')
    }
  }

  function clearSearch() {
    setKeyword('')
    setSubject('all')
  }

  return (
    <>
      <form className="board-form" onSubmit={event => event.preventDefault()}>
        <label>
          Keyword
          <input
            type="search"
            value={keyword}
            onChange={event => setKeyword(event.target.value)}
            placeholder="Title or subject"
            autoComplete="off"
          />
        </label>
        <label>
          Subject
          <select value={subject} onChange={event => setSubject(event.target.value)}>
            <option value="all">All subjects</option>
            {subjects.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className="board-search" type="submit">Search</button>
      </form>

      <p className="board-count">
        {rows.length} {rows.length === 1 ? 'job' : 'jobs'}
      </p>

      {rows.length === 0 ? (
        <p className="board-empty">
          No roles match that search.{' '}
          <button type="button" onClick={clearSearch}>Clear search</button>
        </p>
      ) : (
        <div className="board-scroll">
          <table className="board-table">
            <caption className="sr-only">Open YouTube instructor roles</caption>
            <thead>
              <tr>
                <th scope="col" aria-sort={sort === 'title' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  <button type="button" onClick={() => toggleSort('title')}>Job title</button>
                </th>
                <th scope="col" aria-sort={sort === 'subject' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  <button type="button" onClick={() => toggleSort('subject')}>Subject</button>
                </th>
                <th scope="col">Team</th>
                <th scope="col">Date posted</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(role => (
                <tr key={role.slug}>
                  <td data-label="Job title">
                    <Link href={`/careers/${role.slug}`}>{role.title}</Link>
                  </td>
                  <td data-label="Subject">{role.subject}</td>
                  <td data-label="Team">YouTube</td>
                  <td data-label="Date posted">{CAREERS_POSTED}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
