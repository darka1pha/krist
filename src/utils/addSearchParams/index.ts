const addSearchParams = (key: string, value: string) => {
	const currentParams = new URLSearchParams(window.location.search)

	currentParams.set(key, value)

	const newSearchParams = currentParams.toString()

	return `${window.location.pathname}?${newSearchParams}`
}

export default addSearchParams
