export const fillAutoSuggestions = (suggestions: string[]) => {
  const suggestionElement = document.querySelector('#suggestions')!
  suggestionElement.innerHTML = ''
  suggestions.forEach((suggestion) => {
    const optionElement = document.createElement('option')
    optionElement.append(document.createTextNode(suggestion))
    suggestionElement.append(optionElement)
  })
}

export const fillSearchResult = (
  searchResult: { name: string; stars: number; forks: number }[]
) => {
  const repositoriesTableBodyElement = document.querySelector(
    '#repositories tbody'
  )!
  repositoriesTableBodyElement.innerHTML = ''
  searchResult.forEach((repository) => {
    const rowElement = document.createElement('tr')
    const cellNameElement = document.createElement('td')
    const cellStarsElement = document.createElement('td')
    const cellForksElement = document.createElement('td')

    cellNameElement.append(document.createTextNode(repository.name))
    cellStarsElement.append(
      document.createTextNode(repository.stars.toString())
    )
    cellForksElement.append(
      document.createTextNode(repository.forks.toString())
    )
    rowElement.append(cellNameElement)
    rowElement.append(cellStarsElement)
    rowElement.append(cellForksElement)

    repositoriesTableBodyElement.append(rowElement)
  })
}

export const loading = () => {
  const loadingBlockElement = document.querySelector(
    '#loading-block'
  ) as HTMLElement
  const bodyElement = document.querySelector('body') as HTMLElement
  loadingBlockElement.style.width =
    bodyElement.getBoundingClientRect().width + 'px'
  loadingBlockElement.style.height =
    bodyElement.getBoundingClientRect().height + 'px'
  loadingBlockElement.style.display = 'block'
}

export const loaded = () => {
  ;(document.querySelector('#loading-block') as HTMLElement).style.display =
    'none'
}

export const updatePageNumber = (pageNumber: number) => {
  document.querySelector('#page-number')!.innerHTML = pageNumber.toString()
}

const getStarsOrderElement = () => {
  return document.querySelector('#sort-stars-icon')!
}

const getForksOrderElement = () => {
  return document.querySelector('#sort-forks-icon')!
}

const clearSortOrder = () => {
  const starsOrderElement = getStarsOrderElement()
  const forksOrderElement = getForksOrderElement()
  starsOrderElement.innerHTML = ''
  forksOrderElement.innerHTML = ''
}

const updateSortOrder = (target: Element, order: string) => {
  const iconElement = document.createElement('i')
  iconElement.classList.add('fa')
  iconElement.classList.add(order === 'asc' ? 'fa-sort-up' : 'fa-sort-down')
  target.append(iconElement)
}

export const updateStarsSort = (sort: { sort: string; order: string }) => {
  clearSortOrder()
  updateSortOrder(getStarsOrderElement(), sort.order)
}

export const updateForksSort = (sort: { sort: string; order: string }) => {
  clearSortOrder()
  updateSortOrder(getForksOrderElement(), sort.order)
}

const renderStyle = (url: string) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
}

const renderPage = () => {
  document.body.innerHTML = `<div id="searchPanel">
	<h1>Search</h1>
	<div class="form-inline">
		<div class="form-group">
			<input type="text" id="keyword" placeholder="keyword" list="suggestions" class="form-control" />
			<datalist id="suggestions"></datalist>
		</div>
		<button id="search" class="btn btn-primary">Search</button>
	</div>
</div>

<h1>Result</h1>

<div id="paginationPanel" class="d-flex justify-content-start align-items-center">
	<select id="per-page" class="form-control" style="width: 100px">
    <option value="10" selected>10</option>
    <option value="20">20</option>
    <option value="50">50</option>
  </select>
	<div class="flex-fill"></div>
	<button id="previous-page" class="btn btn-primary">Previous Page</button>
	<span id="page-number">1</span>
	<button id="next-page" class="btn btn-primary">Next Page</button>
</div>

<div id="resultPanel">
	<table id="repositories" class="table">
		<thead>
			<th>
				Name
			</th>
			<th>
				<span id="sort-stars">
          Stars
        </span>
				<span id="sort-stars-icon"></span>
			</th>
			<th>
				<span id="sort-forks">
			    Forks
        </span>
				<span id="sort-forks-icon"></span>
			</th>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div id="loading-block" style="display:none; background: rgba(0, 0, 0, 0.6); position: absolute; top: 0; left: 0;">
</div>`
}

export const init = () => {
  renderStyle(
    'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
  )
  renderStyle(
    'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css'
  )
  renderPage()
}
