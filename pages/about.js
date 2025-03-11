import Link from 'next/link'
import { Card } from 'react-bootstrap'
import ListingDetails from '@/components/ListingDetails'
import PageHeader from '@/components/PageHeader'

export async function getStaticProps() {
	const res = await fetch(
		'https://web422-assignment-beta.vercel.app/api/listings/1206363'
	)

	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { listing: data[0] },
	}
}

export default function About(props) {
	return (
		<>
			<PageHeader
				text={'About the Developer: Guilherme Luiz Barboza da Silva'}
			/>

			<Card>
				<Card.Body>
					<p>
						Hi there! 👋 I&apos;m Guilherme, a 27-year-old developer from Brazil
						who made an exciting career transition from Marketing to Software
						Development.
					</p>
					<p>
						My journey in tech began when I decided to pursue my passion for
						coding and problem-solving, which led me to make the bold decision
						to move to Canada to study software development. This career change
						has allowed me to combine my marketing background with technical
						skills, giving me a unique perspective on building user-focused
						applications and solutions.
					</p>
					<p>
						When I&apos;m not coding, I like watching movies, listening and
						playing music, I play the acoustic guitar, bass and cavaco (a
						brazilian string instrument, usually used for samba).
					</p>
					<p>
						Check out this interesting place I want to visit:{' '}
						<Link href={`/listing/${props.listing._id}`}>
							&quot;{props.listing.name}&quot;
						</Link>
					</p>
				</Card.Body>
				<ListingDetails listing={props.listing} />
			</Card>
		</>
	)
}
