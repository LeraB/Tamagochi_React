import React, {Component} from 'react';

export default class Tamagotchi extends Component {

    constructor(props) {
        super(props)

        this.state = {
            parameters: [],
            appetite: 0,
            health: 0,
            humor: 0,
            thirst: 0,
            ignoreEat: 0,
            ignoreDrink: 0,
            ignorePlay: 0,
            ignoreSleep: 0
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.createDragon = this.createDragon.bind(this)
        this.life = this.life.bind(this)
        this.eventEat = this.eventEat.bind(this)
        this.eventDrink = this.eventDrink.bind(this)
        this.eventSleep = this.eventSleep.bind(this)
        this.eventAwake = this.eventAwake.bind(this)
        this.eventPlay = this.eventPlay.bind(this)
        this.src = require('../images/born.gif')
    }

    createDragon(event) {
        event.preventDefault()
        if (document.getElementById('name').value) {this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst,
                die: this.state.die
            }]),
            appetite: 80,
            health: 100,
            humor: 100,
            thirst: 90
        })
        event.preventDefault()
        document.getElementById('name').style.display = 'none'
        document.getElementById('create').style.display = 'none'
        document.getElementById('eat').style.display = 'inline-block'
        document.getElementById('drink').style.display = 'inline-block'
        document.getElementById('sleep').style.display = 'inline-block'
        document.getElementById('play').style.display = 'inline-block'
        if (document.getElementById('name').value) {
            document.getElementById('say').innerHTML = 'Helo, my name is '
                + document.getElementById('name').value
        } else {
            document.getElementById('say').innerHTML = '\n' +
                'Please enter a name. '
        }
        this.src = require('../images/1.gif')
    }
}
    life() {
        var text = ''
        if (this.state.humor <= 0 || this.state.appetite <= 0 || this.state.thirst <= 0) {
            this.state.health -= 50
            this.state.humor -= 50

        }
        if (this.state.humor < 100 ||
            this.state.health < 100) {
            text = 'I want to sleep\n'
            this.state.ignoreSleep++
        }
        if (this.state.ignoreSleep > 3) {
            this.state.health -= 20
            this.state.humor -= 20
        }
        if (this.state.appetite < 100) {
            text += 'Please, give me the feed\n'
            this.state.ignoreEat++
        }
        if (this.state.ignoreEat > 3) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.appetite -= 10
        }
        if (this.state.thirst < 100) {
            text += 'Please, give me the water\n'
            this.state.ignoreDrink++
        }
        if (this.state.ignoreDrink > 5) {
            this.state.health -= 20
            this.state.humor -= 20
            this.state.thirst -= 10
        }
        if (this.state.humor < 100) {
            text += 'I want to play'
            this.state.ignorePlay++
        }
        if (this.state.ignorePlay > 5) {
            this.state.health -= 10
            this.state.humor -= 20
        }
        if(this.state.humor <= 0 && this.state.health <= 0){
            text = 'Create new pet!'
        }
        if(this.state.appetite <= 0) {
            this.state.appetite = 0;
        }
        if(this.state.appetite >= 100) {
            this.state.appetite = 100;
        }
        return text
    }
    /*healthy(){
       appetite: this.state.appetite,
            health: this.state.health,
            humor: this.state.humor,
            thirst: this.state.thirst
        if(this.state.appetite <= 0) {
            this.state.appetite = 0;
        }
        if(this.state.appetite >= 100) {
            this.state.appetite = 100;
        }
    }*/
    eventEat(event) {
        event.preventDefault()
        if (this.state.appetite >= 150) {
            document.getElementById('say').innerHTML = 'Thank you, I don`t want to eat'
        } else if(this.state.appetite <= 0) {
            this.state.appetite = 0;
            document.getElementById('say').innerHTML = 'I really want to eat!'
        } else {
            document.getElementById('say').innerHTML = 'Yummy'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                appetite: this.state.appetite + 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignoreEat: 0
            })
            this.src = require('../images/eat.gif')
        }
    }

    eventDrink(event) {
        event.preventDefault()
        if (this.state.thirst >= 150) {
            this.state.thirst = 150
            document.getElementById('say').innerHTML = 'Thank you, I don`t want to drink'
        } else if(this.state.thirst <= 0) {
            this.state.thirst = 0;
            document.getElementById('say').innerHTML = 'I really want to drink!'
        }else {
            document.getElementById('say').innerHTML = 'Thank you'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                appetite: this.state.appetite + 10,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst + 20,
                ignoreDrink: 0
            })
            this.src = require('../images/drink.gif')
        }

    }
    eventSleep(event) {
        event.preventDefault()
        document.getElementById('say').innerHTML = 'Zzz...'
            this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                appetite: this.state.appetite - 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignoreSleep: 0
            })
        document.getElementById('eat').disabled = 'true'
        document.getElementById('drink').disabled = 'true'
        document.getElementById('sleep').style.display = 'none'
        document.getElementById('play').disabled = 'true'
        document.getElementById('awake').style.display = 'inline-block'
        document.getElementById('want').style.display = 'none'
        this.src = require('../images/sleep.gif')
    }

    eventAwake(event) {
        event.preventDefault()
        document.getElementById('say').innerHTML = 'Good morning!'
        this.setState({
            parameters: this.state.parameters.concat([{
                appetite: this.state.appetite,
                health: this.state.health,
                humor: this.state.humor,
                thirst: this.state.thirst,
                die: this.state.die
            }]),
            appetite: this.state.appetite - 20,
            health: this.state.health + 10,
            humor: this.state.humor + 10,
            thirst: this.state.thirst - 10,
        })
        document.getElementById('eat').removeAttribute('disabled')
        document.getElementById('drink').removeAttribute('disabled')
        document.getElementById('sleep').style.display = 'inline-block'
        document.getElementById('play').removeAttribute('disabled')
        document.getElementById('awake').style.display = 'none'
        document.getElementById('want').style.display = 'block'
        this.src = require('../images/1.gif')
    }

    eventPlay(event) {
        event.preventDefault()
        document.getElementById('say').innerHTML = 'I like to play!'
        this.setState({
                parameters: this.state.parameters.concat([{
                    appetite: this.state.appetite,
                    health: this.state.health,
                    humor: this.state.humor,
                    thirst: this.state.thirst,
                    die: this.state.die
                }]),
                appetite: this.state.appetite - 20,
                health: this.state.health + 10,
                humor: this.state.humor + 10,
                thirst: this.state.thirst - 10,
                ignorePlay: 0
        })
        this.src = require('../images/play.gif')
    }

    renderHeader() {
        return (
            <ul>

                <li>
                    <p>Appetite: {this.state.appetite}</p>
                    <p className="line" style={{width: this.state.appetite + 'px'}}>
                        {this.state.appetite}
                    </p>
                </li>
                <li>
                    <p>Health: {this.state.health}</p>
                    <p className="line" style={{width: this.state.health + 'px'}}>
                        {this.state.health}
                    </p>
                </li>
                <li>
                    <p>Humor: {this.state.humor}</p>
                    <p className="line" style={{width: this.state.humor + 'px'}}>
                        {this.state.humor}
                    </p>
                </li>
                <li>
                    <p>Thirst: {this.state.thirst}</p>
                    <p className="line" style={{width: this.state.thirst + 'px'}}>
                        {this.state.thirst}
                    </p>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div>
                <h2>Tamagotchi</h2>
                <form>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                    />
                    <button
                        type="submit"
                        id="create"
                        onClick={ this.createDragon}   >Create
                    </button>
                    <button
                        type="button"
                        id="eat"
                        onClick={this.eventEat}
                        style={{display: "none"}}>Eat
                    </button>
                    <button
                        type="button"
                        id="drink"
                        onClick={this.eventDrink}
                        style={{display: "none"}}>Drink
                    </button>
                    <button
                        type="button"
                        id="play"
                        onClick={this.eventPlay}
                        style={{display: "none"}}>Play
                    </button>
                    <button
                        type="button"
                        id="sleep"
                        onClick={this.eventSleep}
                        style={{display: "none"}}>Sleep
                    </button>
                    <button
                        type="button"
                        id="awake"
                        onClick={this.eventAwake}
                        style={{display: "none"}}>Awake
                    </button>
                </form>
                {this.renderHeader()}
                <div id="speak">
                    <div id="say"></div>
                    <div id="want">{this.life()}</div>
                </div>
                <div  id ="gif"><img src={this.src} alt="dragon"/></div>
            </div>
        )
    }
}