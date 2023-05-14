import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const views = {
  initial: 'INITIAL',
  inProgressView: 'INPROGRESS',
  successView: 'SUCCESS',
  failureView: 'FAILURE',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repositoriesData: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: views.initial,
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({apiStatus: views.inProgressView})
    const {activeLanguageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        avatarUrl: repo.avatar_url,
        forksCount: repo.forks_count,
        issuesCount: repo.issues_count,
        starsCount: repo.stars_count,
      }))

      this.setState({
        repositoriesData: updatedData,
        apiStatus: views.successView,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: views.failureView,
      })
    }
  }

  changeLanguage = id => {
    this.setState({activeLanguageId: id}, this.getRepositoryItems)
  }

  Loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessViewResult = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list">
        {repositoriesData.map(repository => (
          <RepositoryItem repositoryDetails={repository} key={repository.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img src="" alt="" className="failure-image" />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  getResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case views.successView:
        return this.renderSuccessViewResult()
      case views.inProgressView:
        return this.Loader()
      case views.failureView:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="popular-heading">Popular</h1>
          <ul className="languages-container">
            {languageFiltersData.map(language => (
              <LanguageFilterItem
                languageDetails={language}
                key={language.id}
                changeLanguage={this.changeLanguage}
                isActive={language.id === activeLanguageId}
              />
            ))}
          </ul>
          {this.getResults()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
