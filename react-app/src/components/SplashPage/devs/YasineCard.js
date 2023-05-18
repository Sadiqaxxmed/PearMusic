import yasiney from '../../../images/Devs/yasiney.png'
const YasineCard = () => {
    return (
        <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Yasiney-Wrapper">
                <img className='HP-Yasiney' src={yasiney} alt='Site Dev Yasine' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
                <p className="HP-Dev-Name">Yasine Benzekri</p>
            </div>
            <a href='https://github.com/Yasine-ben' className="HP-Github">
                <p className="HP-Github-Title">Github&nbsp;</p>
                <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/yasine-benzekri-389457271/' className="HP-LinkedIn">
                <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
                <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
        </div>
    )
}

export default YasineCard;


