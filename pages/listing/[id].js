import { useRouter } from 'next/router'
import useSWR from 'swr'
import ListingDetails from '@/components/ListingDetails'
import Error from 'next/error'
import PageHeader from '@/components/PageHeader'

export default function ListingId() {
	const router = useRouter()
	const { id } = router.query

	const { data, error, isLoading } = useSWR(
		`https://web422-assignment-beta.vercel.app/api/listings/${id}`
	)

	// if data is still loading
	if (isLoading) return null

	// if error throw nextjs default 404 error
	if (error || !data[0]) return <Error statusCode={404} />

	// data is successfully loaded
	if (data)
		return (
			<>
				<PageHeader text={data[0].name} />
				<ListingDetails listing={data[0]} />
			</>
		)
}
