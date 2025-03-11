/*********************************************************************************
 *  WEB422 – Assignment 3
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Guilherme Luiz Barboza da Silva  Student ID: 122538234  Date: March 10, 2025
 *  Published URL: ____________________________________
 *
 ********************************************************************************/

import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { Pagination, Accordion } from 'react-bootstrap'
import ListingDetails from '@/components/ListingDetails'
import PageHeader from '@/components/PageHeader'

export default function Home() {
	const [page, setPage] = useState(1)
	const [pageData, setPageData] = useState([])

	const { data, error } = useSWR(
		`https://web422-assignment-beta.vercel.app/api/listings?page=${page}&perPage=10`
	)

	useEffect(() => {
		if (data) {
			setPageData(data.listings)
		}
	}, [data])

	// decreases the page state value by 1, if it's greater than 1
	function previous() {
		if (page > 1) {
			setPage(page - 1)
		}
	}

	// increases the page state value by 1
	function next() {
		setPage(page + 1)
	}

	return (
		<>
			<PageHeader text="Browse Listings : Sorted by Number of Ratings" />
			{/* <Accordion defaultActiveKey={pageData[0]._id}> */}
			<Accordion>
				{pageData.map((listing) => {
					return (
						<Accordion.Item eventKey={listing._id} key={listing._id}>
							<Accordion.Header>
								<strong>{listing.name}</strong> - {listing.address.street}
							</Accordion.Header>
							<Accordion.Body>
								<ListingDetails listing={listing} />
							</Accordion.Body>
						</Accordion.Item>
					)
				})}
			</Accordion>
			<br />
			<Pagination>
				<Pagination.Prev onClick={previous} />
				<Pagination.Item>{page}</Pagination.Item>
				<Pagination.Next onClick={next} />
			</Pagination>
		</>
	)
}
