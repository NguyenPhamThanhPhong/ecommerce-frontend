import { useRouter } from 'next/router'
import { notFound } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    const segments = router.query.slug || []

    if (segments.length === 0) {
        return <p>Post: None</p>
    }
    else if (segments.length === 1) {
        return <p>Post: {segments[0]}</p>
    }
    //else handle not found...
    else
        notFound()


    //   return <p>Post: {JSON.stringify(segments)}</p>
}