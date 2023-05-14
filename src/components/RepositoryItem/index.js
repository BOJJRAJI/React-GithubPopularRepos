import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    starsCount,
    issuesCount,
    forksCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-list">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <h1 className="repository-name">{name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-image"
        />
        <p className="repository-star">{starsCount} stars</p>
      </div>
      <div className="fork-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="fork-image"
        />
        <p className="repository-forks">{forksCount} forks</p>
      </div>
      <div className="issues-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-image"
        />
        <p className="repository-issues">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
