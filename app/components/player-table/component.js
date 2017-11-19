import Component from '@ember/component';
import { set } from '@ember/object';
import { computed } from 'ember-decorators/object';
import Table from 'ember-light-table';
import generateKD from "../../utils/generate-kd";

export default class extends Component {

  @computed('players', 'reverse')
  get playerTable() {
    let players = this.get('players');
    const reverse = this.get('reverse');
    const columns = [{ // TODO move
      label: 'Player',
      valuePath: 'name',
      width: '120px',
    }, {
      label: 'Score',
      valuePath: 'score',
      width: '60px'
    },{
      label: 'Objectives',
      valuePath: 'objectives',
      width: '100px'
    },{
      label: 'K',
      valuePath: 'kills',
      width: '40px'
    }, {
      label: 'D',
      valuePath: 'deaths',
      width: '40px'
    }, {
      label: 'Ø',
      valuePath: 'kd',
      width: '50px'
    }]

    players.forEach(player => { //
      set(player, 'kd', generateKD(player.kills, player.deaths))
    })

    return new Table(
      reverse ? columns.reverse() : columns,
      players.sort((a,b) => b.score-a.score)
    )
  }

}
