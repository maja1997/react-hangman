import React,{Component} from 'react';
//importujemo komponentu Vesala
import Vesala from './Vesala';
//importujemo funkciju koja nam daje random programski jezik
import randWord from './word';
//ovde importujemo sliku za svaki broj gresaka
import greska0 from './images/0.jpg';
import greska1 from './images/1.jpg';
import greska2 from './images/2.jpg';
import greska3 from './images/3.jpg';
import greska4 from './images/4.jpg';
import greska5 from './images/5.jpg';
import greska6 from './images/6.jpg';

class Hangman extends Component {

    //ako komponenta(Hangman u ovom slucaju) ne dobija props ovo ce biti njegov default props
    static defaultProps = {
        maxNetacnih: 6,
        slike:[greska0,greska1,greska2,greska3,greska4,greska5,greska6]
    }
    //konstruktor klase ovde je ceo state(stanje) nase aplikacije pratimo broj gresaka, karaktere koje
    //je probao da pogodi kao ii odgovor
    constructor(props){
        super(props);

        this.state = {
            greske: 0,
            pogadjao: [],
            odgovor: randWord()
        }
    }

    //vraca trenutno stanje reci kao niz npr [j,a,_,a]  za "java" ako smo do tad pogodili 'j' i 'a'
    pogodjenaRec(){
        //split('') deli string sa odgovorom na niz karaktera posele pomocu map iteriramo kroz taj niz
        //pogodak znaci predstavlja karakter(slovo) u za svaku iteraciju
        return this.state.odgovor.split('').map(pogodak => {
            //ako se pogodak nazali u nizu karaktera koje smo pogadjali onda vraca to slovo
            if(this.state.pogadjao.includes(pogodak)){
                return pogodak;
            }
            //ako ne vraca '_'
            else return '_';
        });
    }
        //kada kliknemo na dugme izvrsava se ova funkcija 'e' je event object
    handleClickNaDugme(e){
        //e.target.value je slovo dugmeta na koje smo kliknuli
        const slovo = e.target.value;
        //ovde menjamo state aplikacije kada se menja state mora da se radi pomocu setState metode
        //unutar setState prosledjujemo anonimnu funkciju koja kao argument prima stari state i vraca
        //novi objekat koji treba da se merguje sa starim state
        this.setState(state => ({
            // ove tri tacke su spread operator samo pravim niz koji ima sve iz state.pogadao i novo slovo
            pogadjao: [...state.pogadjao,slovo],
            greske: state.greske + (state.odgovor.includes(slovo) ? 0:1)
        }));
    }
    generisiDugmice(){
        const abeceda = 'abcdefghijklmnopqrstuvwxyz';
        //sa split delim string na niz karaktera i sa map iteriramo kroz njega isto gao gore za pogodjenaRec()
        const dugmici = abeceda.split('').map(slovo => {

        //dugmetu dajem klasu btn koju sam stilizovao u index.css
        //za handleClickNaDugme morate da bind-ujete 'this' ili kao ja ovde ili u konstruktoru
        //zato sto je to handleClickNaDugme metoda i prosledjuje se kao callback eventlistneru
        //i on kada pozove callback 'this' se vise nece odnositi na objekat Hangman vec na globalni Window object
        //includes proverava da li je slovo sadrzano u nizu pogadjao i vraca boolean
            return (
                <button className="btn" key={slovo} value={slovo} 
                onClick={this.handleClickNaDugme.bind(this)}
                disabled={this.state.pogadjao.includes(slovo)}>
                    {slovo}
                </button>
            )
        });
        //ovde vracamo sve dugmice
        return dugmici;
    }
    
    render(){
        //sa join spajamo niz koji pogodjenaRec() vraca i ako je jednako odgovoru onda je korisnik pobedio
        const pobedio = this.pogodjenaRec().join('') === this.state.odgovor;
        //ako je broj gresaka veci ili jednak maksimalnom broju korisnik je izgubio
        const izgubio = this.state.greske >= this.props.maxNetacnih;
        //u dugmice smestamo sve dugmice
        let dugmici = this.generisiDugmice();

        //ako je korisnik pobedio umesto u dugmici umesto dugmica smestamo h2 sa porukom Pobedio si
        if(pobedio){
            dugmici = <h2>Pobedio si!!!</h2>
        }
        //isto kao za pobedio
        if(izgubio){
            dugmici = <h2>Izgubilo si!!!</h2>
        }
        //u komponentu Vesala prosledjujem kao prop sliku koja odgovara trenutnom broju gresaka
        return (
            <div className="hangman-container">
                <h1>Pogodite programski jezik spasite demonstratora!</h1>
                <Vesala img={this.props.slike[this.state.greske]}/>
                <p>{this.pogodjenaRec()}</p>
                <div className="dugme-container">
                    {dugmici}
                </div>
            </div>
        );
    }
}
export default Hangman;