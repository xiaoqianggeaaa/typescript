import React, { Component } from 'react' // 必须引入React

type STATE = {
  val: any
}
interface PROPS {
  val: number
  onClick: () => void
}
export default class Text1 extends Component<PROPS, STATE> {
  constructor(PROPS: any) {
    super(PROPS)
    this.state = {
      val: 0
    }
  }
  static getDerivedStateFromProps(nextporps: any, prevState: any) {
    const { val } = nextporps
    if(val !== prevState.val) {
      return {val}
    }
  }
  componentDidMount() {
  }
  getSnapshotBeforeUpdate(nexporps: any, prevState: any) {
    return 'ddd'
  }
  componentDidUpdate(nextprops: any, prevState: any, data: any) {
    console.log(nextprops, prevState, data)
  }
  render() {
    return <button onClick={this.props.onClick}>{this.props.val}</button>
  }
}
