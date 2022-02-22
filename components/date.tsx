import { parseISO, format } from 'date-fns'

export default function Date ({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  console.log('Date:', date)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
