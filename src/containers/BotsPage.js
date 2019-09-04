import React from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'

class BotsPage extends React.Component {

  state = {
    botList: [],
    botArmyList: [],
    showBotSpec: false,
    currentBot: {}
  }

  componentDidMount() {
    fetch('https://bot-battler-api.herokuapp.com/api/v1/bots')
      .then(res => res.json())
      .then(fetchedBotList => this.setState({ botList: fetchedBotList }))
  }

  addBotToArmy = (bot) => {

    const removedDuplicates = [...this.state.botArmyList, bot].filter((bot, pos, arr) => {
      return arr.map(mapObj => mapObj["id"]).indexOf(bot["id"]) === pos;
    });

    this.setState({
      botArmyList: removedDuplicates
      // botArmyList: [...new Set([...this.state.botArmyList, bot])]
    })

  }

  deleteBotFromArmy = (deletedBot) => {
    console.log(deletedBot)
    const updatedBotArmyList = this.state.botArmyList.filter(bot => {
      return bot.id !== deletedBot.id
    })

    this.setState({ botArmyList: updatedBotArmyList })

  }

  showBotSpec = (bot) => {
    this.setState({
      showBotSpec: !this.state.showBotSpec
    })

    this.setState({ currentBot: bot })
  }

  render() {

    const conditionalRender =
      this.state.showBotSpec ?
        <BotSpecs
          {...this.state.currentBot}
          returnToCollection={this.showBotSpec}
          addToArmy={this.addBotToArmy}
        /> :
        (
          <React.Fragment>
            <YourBotArmy
              botArmyList={this.state.botArmyList}
              handleClick={this.deleteBotFromArmy}
            />

            <BotCollection
              botList={this.state.botList}
              // handleClick={this.addBotToArmy}
              handleClick={this.showBotSpec}
            />
          </React.Fragment>
        )



    return (
      <React.Fragment>
        {conditionalRender}
      </React.Fragment>
    );
  }

}

export default BotsPage;
