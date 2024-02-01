const deleteSearchParams = ({ param }: { param: string }) => {
	const newSearchParams = new URLSearchParams(window.location.search)

	newSearchParams.delete(param.toLocaleLowerCase())

	const newPathname = `${
		window.location.pathname
	}?${newSearchParams.toString()}`

	return newPathname
}

export default deleteSearchParams
