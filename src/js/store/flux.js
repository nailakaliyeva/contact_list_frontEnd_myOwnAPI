const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			addContact: object => {
				// let store = getStore();
				// setStore({ contacts: store.contacts.concat(object) });
				fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/contact", {
					method: "post",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(object)
				})
					.then(() => {
						fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/contact")
							.then(response => response.json())
							.then(data => setStore({ contacts: data.reverse() }))
							.catch(err => console.error(err));
					})
					.catch(err => console.error(err));
			},
			deleteContact: id => {
				console.log("delete was successfully called for id", id);
				fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/update/" + id, {
					method: "DELETE"
				}).then(() => {
					fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/contact")
						.then(response => response.json())
						.then(data => {
							setStore({ contacts: data.reverse() });
						});
				});
			},
			updateContact: obj => {
				fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/update/" + obj.id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(obj)
				}).then(() => {
					fetch("https://3000-a7599e8b-6013-4b02-9add-db43b0974098.ws-us0.gitpod.io/contact")
						.then(response => response.json())
						.then(data => {
							setStore({ contacts: data.reverse() });
						});
				});
			}
		}
		//(Arrow) Functions that update the Store
		// Remember to use the scope: scope.state.store & scope.setState()
	};
};
export default getState;
