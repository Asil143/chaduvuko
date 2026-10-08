'use client'
import dynamic from 'next/dynamic'

// One dynamic import per lesson so each lesson ships as its own chunk instead of
// every lesson landing in the shared route bundle. Still server-rendered (ssr: true).
const LESSONS: Record<string, React.ComponentType> = {
  'what-is-a-network':        dynamic(() => import('@/content/networking/what-is-a-network')),
  'network-types-topologies': dynamic(() => import('@/content/networking/network-types-topologies')),
  'osi-model':                dynamic(() => import('@/content/networking/osi-model')),
  'tcp-ip-model':             dynamic(() => import('@/content/networking/tcp-ip-model')),
  'data-transmission':        dynamic(() => import('@/content/networking/data-transmission')),
  'binary-and-hex':           dynamic(() => import('@/content/networking/binary-and-hex')),
  'cables-and-connectors':    dynamic(() => import('@/content/networking/cables-and-connectors')),
  'ethernet-and-switching':   dynamic(() => import('@/content/networking/ethernet-and-switching')),
  'arp':                      dynamic(() => import('@/content/networking/arp')),
  'vlans':                    dynamic(() => import('@/content/networking/vlans')),
  'spanning-tree':            dynamic(() => import('@/content/networking/spanning-tree')),
  'wireless-networking':      dynamic(() => import('@/content/networking/wireless-networking')),
  'ip-addressing':            dynamic(() => import('@/content/networking/ip-addressing')),
  'subnetting':               dynamic(() => import('@/content/networking/subnetting')),
  'ipv6':                     dynamic(() => import('@/content/networking/ipv6')),
  'routing-fundamentals':     dynamic(() => import('@/content/networking/routing-fundamentals')),
  'dynamic-routing':          dynamic(() => import('@/content/networking/dynamic-routing')),
  'nat-and-dhcp':             dynamic(() => import('@/content/networking/nat-and-dhcp')),
  'icmp':                     dynamic(() => import('@/content/networking/icmp')),
  'tcp-deep-dive':            dynamic(() => import('@/content/networking/tcp-deep-dive')),
  'udp':                      dynamic(() => import('@/content/networking/udp')),
  'ports-and-sockets':        dynamic(() => import('@/content/networking/ports-and-sockets')),
  'tls-ssl':                  dynamic(() => import('@/content/networking/tls-ssl')),
  'quic-http3':               dynamic(() => import('@/content/networking/quic-http3')),
  'dns':                      dynamic(() => import('@/content/networking/dns')),
  'http-and-https':           dynamic(() => import('@/content/networking/http-and-https')),
  'email-protocols':          dynamic(() => import('@/content/networking/email-protocols')),
  'ssh':                      dynamic(() => import('@/content/networking/ssh')),
  'ftp-and-sftp':             dynamic(() => import('@/content/networking/ftp-and-sftp')),
  'dhcp-deep-dive':           dynamic(() => import('@/content/networking/dhcp-deep-dive')),
  'snmp-and-syslog':          dynamic(() => import('@/content/networking/snmp-and-syslog')),
  'ntp':                      dynamic(() => import('@/content/networking/ntp')),
  'network-attacks':          dynamic(() => import('@/content/networking/network-attacks')),
  'firewalls-and-acls':       dynamic(() => import('@/content/networking/firewalls-and-acls')),
  'ids-and-ips':              dynamic(() => import('@/content/networking/ids-and-ips')),
}

export function NetworkingLesson({ slug }: { slug: string }) {
  const Lesson = LESSONS[slug]
  if (!Lesson) throw new Error(`No networking lesson component for "${slug}"`)
  return <Lesson />
}
