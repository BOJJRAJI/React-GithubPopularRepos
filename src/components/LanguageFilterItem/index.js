import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, changeLanguage} = props
  const {id, language} = languageDetails

  const buttonClass = isActive ? 'active-button' : 'inActive-button'

  function onChangeLanguage() {
    changeLanguage(id)
  }

  return (
    <li className="language-item">
      <button className={buttonClass} type="button" onClick={onChangeLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
