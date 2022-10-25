const makeRequest = async (url, method, body) => {
	return await fetch(url, {
		method,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	});
};

export default makeRequest;
