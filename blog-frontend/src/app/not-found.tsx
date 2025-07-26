import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='m-5'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className='underline pt-4'>Return Home</Link>
        </div>
    )
}