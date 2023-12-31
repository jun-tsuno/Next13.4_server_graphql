import React from 'react';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';

// reference
// https:codevoweb.com/setup-and-use-apollo-client-in-nextjs-13-app-directory/

// page always displays the latest data
export const dynamic = 'force-dynamic';

// get data on the server side
const query = gql`
	query {
		users {
			id
			name
			email
		}
	}
`;

interface Response {
	users: { id: number; name: string; email: string }[];
}

export default async function ServerSide() {
	const data = await getClient().query<Response>({
		query,
	});

	return (
		<main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr',
					gap: 20,
				}}
			>
				{data.data.users.map((user) => (
					<div
						key={user.id}
						style={{ border: '1px solid #ccc', textAlign: 'center' }}
					>
						<img
							src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
							alt={user.name}
							style={{ height: 180, width: 180 }}
						/>
						<h3>{user.name}</h3>
					</div>
				))}
			</div>
		</main>
	);
}
