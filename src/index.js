import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Switch from 'react-switch';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Icon, Form, Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import BounceLoader from 'react-spinners/BounceLoader';
import ReactTooltip from 'react-tooltip';
import Truncate from 'react-truncate';
import { animateScroll as scroll } from 'react-scroll';
import _ from 'lodash';
import commentBox from 'commentbox.io';
import './index.css';

const colors = {
    world: '#7C4FFF',
    politics: '#419488',
    business: '#4696EC',
    technology: '#CEDC3A',
    sport: '#F7C244',
    sports: '#F7C244',
    other: '#6E757B',
    guardian: '#14284A',
    nytimes: '#DDDDDD'
}

const text = {
    world: 'white',
    politics: 'white',
    business: 'white',
    technology: 'black',
    sport: 'black',
    sports: 'black',
    other: 'white',
    guardian: 'white',
    nytimes: 'black'
}

let bookmark = JSON.parse(localStorage.getItem('bookmark')) ? JSON.parse(localStorage.getItem('bookmark')) : {};

const SectionTag = props => (
    <p 
        className="section-tag" 
        style={colors[props.section.toLowerCase()] !== undefined ? 
            { backgroundColor: colors[props.section.toLowerCase()], color: text[props.section.toLowerCase()] } : 
            { backgroundColor: colors['other'], color: text['other'] }}
    ><b>
        {props.section.toUpperCase()}
    </b></p>
);

const SwitchButton = props => {

    const [state, setState] = React.useState( props.data.page.slice(0, props.data.page.search("-")) === "guardian" ? true : false );

    const toggleChecked = () => {
        setState((previous) => !previous);
        if(state === false) {
            props.data.changePage("guardian-home");
        }
        else if(state === true) {
            props.data.changePage("nytimes-home");
        }
    };

    return (
        <>
            <span className="source-toggle-title">NYTimes</span>
            <Switch 
                uncheckedIcon={false} 
                checkedIcon={false} 
                className="react-switch" 
                onColor="#08f" 
                onChange={toggleChecked} 
                checked={state}
                data={props.data}
            />
            <span className="source-toggle-title">Guardian</span>
        </>
    );
}

const NavigationBar = props => {

    const [state, setState] = React.useState(0);

    const sectionClicked = (section) => {
        setState(state === 0 ? 1 : 0);
        if(props.data.page === "guardian-"+section || props.data.page === "nytimes-"+section) {
            return;
        }
        else if(props.data.page.slice(0, props.data.page.search("-")) === "guardian") {
            props.data.changePage("guardian-"+section);
        }
        else if(props.data.page.slice(0, props.data.page.search("-")) === "nytimes") {
            props.data.changePage("nytimes-"+section);
        }
    };

    function isSectionOrUrl(path) {
        const page = path.slice(props.data.page.search("-")+1);
        return (page === "home" || page === "world" || page === "politics" || page === "business" || page === "technology" || page === "sport" || page === "sports");
    }

    function isPageSelected(page) {
        return props.data.page.slice(props.data.page.search("-")+1) === page ? "white" : "";
    }

    return (
        <Navbar variant="dark" sticky={true} id="navigation-bar" expand="lg">
            <SearchBar data={props.data} key={state} />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link style={{ color: isPageSelected("home") }} href="" onClick={() => sectionClicked("home")} >Home</Nav.Link>
                <Nav.Link style={{ color: isPageSelected("world") }} href="" onClick={() => sectionClicked("world")} >World</Nav.Link>
                <Nav.Link style={{ color: isPageSelected("politics") }} href="" onClick={() => sectionClicked("politics")} >Politics</Nav.Link>
                <Nav.Link style={{ color: isPageSelected("business") }} href="" onClick={() => sectionClicked("business")} >Business</Nav.Link>
                <Nav.Link style={{ color: isPageSelected("technology") }} href="" onClick={() => sectionClicked("technology")} >Technology</Nav.Link>
                <Nav.Link style={{ color: isPageSelected("sport") }} href="" onClick={() => sectionClicked("sport")} >Sports</Nav.Link>
                </Nav>
                <Nav>
                <Icon 
                    inverted color="grey" 
                    size="large" 
                    name={props.data.page.slice(props.data.page.search("-")+1) === "favorites" ? "bookmark" : "bookmark outline"} 
                    className="bookmark-icon" 
                    onClick={() => sectionClicked("favorites")} 
                />
                {(isSectionOrUrl(props.data.page)) ? <SwitchButton data={props.data} /> : <></>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [], selectedResult: null };
    }

    delay = interval => new Promise(resolve => setTimeout(resolve, interval));

    handleSearchChange = async (event, { value }) => {
        await this.delay(1000);
        try {
            const response = await fetch(
                `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${value}`,
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": "3142b2de570948a6b9a5ec66c000cc2d"
                    }
                }
            );
            const data = await response.json();
            const resultsRaw = data.suggestionGroups[0].searchSuggestions;
            const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
            this.setState({ results });
        } catch (error) {
            console.error(`Error fetching search ${value}`);
        }
    };

    handleResultSelect = (e, { result }) => {
        this.setState({ selectedResult: result });
        this.props.data.changePage(this.props.data.page.slice(0, this.props.data.page.search("-"))+"-search-"+result.title);
    }

    render () {
        return (
            <Form className="search-field">
                <Form.Field className="search-box">
                <Search 
                    icon="angle down" 
                    type="text" 
                    placeholder="Enter keyword..." 
                    onSearchChange={_.debounce(this.handleSearchChange, 1000, {
                        leading: true
                    })}
                    results={this.state.results}
                    onResultSelect={this.handleResultSelect}
                />
                </Form.Field>
            </Form>
        );
    }
}

const ShareTab = props => (
    <>
        <h5>{props.title}</h5>
        <hr></hr>
        <p>Share via</p>
        <FacebookShareButton hashtag="#CSCI_571_NewsApp" url={props.url} className="share-button">
            <FacebookIcon round={true} size={50} />
        </FacebookShareButton>
        <TwitterShareButton url={props.url} hashtags={["CSCI_571_NewsApp"]} className="share-button">
            <TwitterIcon round={true} size={50} />
        </TwitterShareButton>
        <EmailShareButton url={props.url} subject="CSCI_571_NewsApp" className="share-button">
            <EmailIcon round={true} size={50} />
        </EmailShareButton>
    </>
);

const BookmarkNotification = props => (
    <>
        <h5>{props.message} - {props.title}</h5>
    </>
);

class ArticleCard extends Component {

    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }
    
    share(e) {
        e.stopPropagation();
        toast(<ShareTab title={this.props.title} url={this.props.url} />, { className: "notification-tab" });
    }

    render () {
        return (
            <Card className="headline-card">
                <Image src={this.props.img_url} thumbnail className="headline-card-img"/>
                <Card.Body className="headline-container">
                    <div className="title-container">
                        <Card.Title className="article-title"><i><b>{this.props.title}</b></i>
                        <Icon name="share alternate" onClick={(e) => this.share(e)} /></Card.Title>
                    </div>
                    <Card.Text><Truncate lines={3}>{this.props.description}</Truncate></Card.Text>
                    <div className="bottom-card-info">
                        <Card.Text className="date-tag"><i>{this.props.date}</i></Card.Text>
                        <SectionTag section={this.props.section} />
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

class TruncatedDescription extends Component {
    constructor(props) {
        super(props);
        this.state = { truncated: true };
    }

    showMoreOrLess() {
        this.setState({ truncated: !this.state.truncated });
        if(this.state.truncated) { scroll.scrollToBottom(); }
    }

    render () {
        if(this.state.truncated) {
            return (
                <Truncate lines={6} ellipsis={<Icon color="black" size="large" name="angle down" className="elipsis-icon" onClick={() => this.showMoreOrLess()}/>}>
                    {this.props.description}
                </Truncate>
            );
        }
        else {
            return (
                <>
                    {this.props.description}
                    <Icon color="black" size="large" name="angle up" className="elipsis-icon" onClick={() => this.showMoreOrLess()}/>
                </>
            );
        }
    }
}

class ExpandedCard extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
        this.state = { bookmarked: (this.props.page in bookmark) };
    }
    
    share() {
        toast(<ShareTab title={this.props.title} url={this.props.url} />, { className: "notification-tab" });
    }

    bookmark(id) {
        if(id in bookmark) {
            delete bookmark[id];
            console.log(bookmark);
            localStorage.setItem('bookmark', JSON.stringify(bookmark));
            toast(<BookmarkNotification message={"Removing"} title={this.props.title} />, { className: "notification-tab", autoClose: 3000 });
        }
        else {
            bookmark[id] = {
                title: this.props.title,
                img: this.props.img_url,
                description: this.props.description,
                date: this.props.date,
                section: this.props.section,
                url: this.props.url
            };
            console.log(bookmark);
            localStorage.setItem('bookmark', JSON.stringify(bookmark));
            toast(<BookmarkNotification message={"Saving"} title={this.props.title} />, { className: "notification-tab", autoClose: 3000 });
        }
        this.setState({ bookmarked: this.state.bookmarked ? false : true });
    }

    componentDidMount() {
        this.removeCommentBox = commentBox('5680080743301120-proj');
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render () {
        return (
            <>
            <Card className="card-details">
                <Card.Body>
                    <Card.Title><h1><i>{this.props.title}</i></h1></Card.Title>
                    <Card.Title className="date-tag"><h3><i>{this.props.date}</i></h3></Card.Title>
                    <div className="card-buttons-row">
                        <ReactTooltip  effect="solid"/>
                        <FacebookShareButton hashtag="#CSCI_571_NewsApp" url={this.props.url} data-tip="Facebook" className="card-buttons">
                            <FacebookIcon round={true} size={30} />
                        </FacebookShareButton>
                        <TwitterShareButton url={this.props.url} hashtags={["CSCI_571_NewsApp"]} data-tip="Twitter" className="card-buttons">
                            <TwitterIcon round={true} size={30} />
                        </TwitterShareButton>
                        <EmailShareButton url={this.props.url} subject="CSCI_571_NewsApp" data-tip="Email" className="card-buttons">
                            <EmailIcon round={true} size={30} />
                        </EmailShareButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon 
                            color="red" 
                            size="large" 
                            name={this.state.bookmarked ? "bookmark" : "bookmark outline"} 
                            data-tip="Bookmark" 
                            className="card-buttons" 
                            onClick={() => this.bookmark(this.props.page)}
                        />
                    </div>
                    <Card.Img variant="bottom" src={this.props.img_url} />
                    <Card.Text>
                        <TruncatedDescription description={this.props.description} />
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="commentbox" id={this.props.id}></div>
            </>
        );
    }
}

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
        this.trash = this.trash.bind(this);
        this.state = {
            bookmark: bookmark
        }
    }
    
    share(e, title, url) {
        e.stopPropagation();
        toast(<ShareTab title={title} url={url} />, { className: "notification-tab" });
    }

    trash(e, title, id) {
        e.stopPropagation();
        delete bookmark[id]
        this.setState({ bookmark: bookmark });
        console.log(this.state.bookmark);
        localStorage.setItem('bookmark', JSON.stringify(this.state.bookmark));
        toast(<BookmarkNotification message={"Removing"} title={title} />, { className: "notification-tab", autoClose: 3000 });
    }

    articleClicked(id) {
        this.props.changePage(id);
    }

    render = () => {
        if(Object.keys(this.state.bookmark).length === 0) {
            return (
                <h3 className="no-saved-articles"><b>You have no saved articles</b></h3>
            );
        }
        else {
            return (
                <>
                    <h3 className="favorites-title"><b>Favorites</b></h3>
                    <CardDeck className="deck">
                        { Object.keys(this.state.bookmark).map((article) =>
                            <Card key={article} className="deck-cards" onClick={() => this.articleClicked(article)}>
                                <Card.Body>
                                    <Card.Text className="deck-cards-title">
                                        <b>{this.state.bookmark[article].title}</b>
                                        <Icon name="share alternate" onClick={(e) => this.share(e, this.state.bookmark[article].title, this.state.bookmark[article].url)} className="deck-cards-icon" />
                                        <Icon name="trash alternate" onClick={(e) => this.trash(e, this.state.bookmark[article].title, article)} className="deck-cards-icon" />
                                    </Card.Text>
                                    <Image src={this.state.bookmark[article].img} thumbnail className="deck-cards-img"/>
                                    <div className="bottom-card-info">
                                        <Card.Text className="date-tag"><i>{this.state.bookmark[article].date}</i></Card.Text>
                                        <SectionTag section={article.slice(0, article.search("-"))} />
                                        <SectionTag section={this.state.bookmark[article].section} />
                                    </div>
                                </Card.Body>
                            </Card> 
                        ) }
                    </CardDeck>
                </>
            );
        }
    }
}

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }
    
    share(e, title, url) {
        e.stopPropagation();
        toast(<ShareTab title={title} url={url} />, { className: "notification-tab" });
    }

    articleClicked(id) {
        this.props.changePage(id);
    }

    render = () => {
        return (
            <>
                <h3 className="favorites-title"><b>Results</b></h3>
                <CardDeck className="deck">
                    { this.props.articles.map((article) =>
                        <Card key={article.key} className="deck-cards" onClick={() => this.articleClicked(this.props.url.slice(0, this.props.url.search("-")+1)+article.id) }>
                            <Card.Body>
                                <Card.Text className="deck-cards-title">
                                    <b>{article.title}</b>
                                    <Icon name="share alternate" onClick={(e) => this.share(e, article.title, article.url)} className="deck-cards-icon" />
                                </Card.Text>
                                <Image src={article.img} thumbnail className="deck-cards-img"/>
                                <div className="bottom-card-info">
                                    <Card.Text className="date-tag"><i>{article.date}</i></Card.Text>
                                    <SectionTag section={article.section} />
                                </div>
                            </Card.Body>
                        </Card> 
                    ) }
                </CardDeck>
            </>
        );
    }
}

class Headlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            articles: []
        }
    }

    componentDidUpdate(state) {
        if (state.url !== this.props.url) {
            this.setState({ articles: [] });
            fetch("http://localhost:5000/"+this.props.url.replace(/\//g, "~"))
            .then(result => result.json())
            .then(articles => this.setState({url: this.props.url, articles: articles}, () => console.log(this.state)));
        }
    }

    componentDidMount = () => {
        fetch("http://localhost:5000/"+this.props.url.replace(/\//g, "~"))
            .then(result => result.json())
            .then(articles => this.setState({articles}, () => console.log(this.state)));
    }

    articleClicked(id) {
        const page = this.state.url.slice(0, this.state.url.search("-"));
        this.props.changePage(page+"-"+id);
    }

    render = () => {
        const { articles } = this.state;
        const path = this.props.url.slice(this.props.url.search("-")+1);
        if(path.slice(0, path.search("-")) === "search") {
            return (
                <SearchResult articles={articles} url={this.props.url} changePage={this.props.changePage.bind(this)} />
            ); 
        }
        else if (articles.length === 0) {
            return (
                <>
                    <div className="bounce-loader">
                        <BounceLoader
                            size={60}
                            color={"#123abc"}
                            loading={true}
                        />
                        <h5><b>Loading</b></h5>
                    </div>
                </>
            );
        } 
        else {
            return (
                <div>
                    {(articles.length > 1) ? articles.map((article) =>
                        <div onClick={() => this.articleClicked(article.id)} key={article.key} >
                            <ArticleCard 
                                id={article.id}
                                img_url={article.img} 
                                title={article.title} 
                                description={article.description} 
                                date={article.date} 
                                section={article.section} 
                                url={article.url} 
                            />
                        </div>
                    ) : <ExpandedCard 
                            id={articles.id}
                            img_url={articles.img} 
                            title={articles.title} 
                            description={articles.description} 
                            date={articles.date} 
                            section={articles.section} 
                            url={articles.url} 
                            page={this.props.url}
                        />}
                </div>
            );
        }
    }
}

let storedPage = JSON.parse(localStorage.getItem('page')) ? JSON.parse(localStorage.getItem('page')) : "guardian-home";

class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { page: storedPage };
    }

    changePage(newPage) {
        this.setState({ page: newPage });
        localStorage.setItem('page', JSON.stringify(newPage));
    }

    render = () => {
        return (
            <>
                <NavigationBar data={{ page: this.state.page, changePage: this.changePage.bind(this) }} />
                <div className="main-container">
                    {
                        this.state.page.slice(this.state.page.search("-")+1) === "favorites" ?
                        <Favorites url={this.state.page} changePage={this.changePage.bind(this)} /> :
                        <Headlines url={this.state.page} changePage={this.changePage.bind(this)} />
                    }
                    <ToastContainer closeOnClick={false} autoClose={false} position="top-center" transition={Slide} hideProgressBar={true} />
                </div>
            </>
        );
    }
}

const HomePage = () => (
    <>
        <MainComponent />
    </>
);

ReactDOM.render(
    <HomePage />, document.getElementById('root')
);