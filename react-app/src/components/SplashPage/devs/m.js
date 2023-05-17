function MikeCard({mikey}) {
    return (
        <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Mikey-Wrapper">
                <img className="HP-Mikey" src={mikey} alt='Site Dev Mike' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
                <p className="HP-Dev-Name">Michael Salariosa</p>
            </div>
            <a href='https://github.com/mike-650' className="HP-Github">
                <p className="HP-Github-Title">Github&nbsp;</p>
                <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/michael-s-688653118/' className="HP-LinkedIn">
                <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
                <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
        </div>
    )
}

export default MikeCard
