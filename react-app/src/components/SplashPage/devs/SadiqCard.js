import sadiq from '../../../images/Devs/sadiqie.png'
function SadiqCard() {
    return (
        <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Sadiqey-Wrapper">
                <img className="HP-Sadiqey" src={sadiq} alt='Site Dev Sadiq' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
                <p className="HP-Dev-Name">Sadiq Ahmed</p>
            </div>
            <a href='https://github.com/Sadiqaxxmed' className="HP-Github">
                <p className="HP-Github-Title">Github&nbsp;</p>
                <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/sadiqaxxmed/' className="HP-LinkedIn">
                <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
                <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
        </div>
    )
}

export default SadiqCard