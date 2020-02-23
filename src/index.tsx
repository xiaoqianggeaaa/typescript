import React, { Component } from 'react' // 必须引入React
import Button from './test1'
interface IHomeProps {
  name: string
}
interface IHomeState {
  title: string
  val: number
  aa: any
}
class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps, state: IHomeState) {
    super(props, state)
    console.log('parentconstructor')
    this.state = {
      title: 'home state title',
      val: 1,
      aa: 0
    }
    this.setState({ aa: 'cc' }, () => {
      debugger
    })
  }
  public props: IHomeProps = {
    name: 'props name'
  }
  // public state: IHomeState = {
  //   title: 'home state title',
  //   val: 1,
  //   aa: 0
  // }
  // static getDerivedStateFromProps(props: any, state: any) {
  //   console.log(this, '===')
  //   return null
  // }
  // componentWillMount() {
  //   this.setState({aa: 'cc'}, ()=>{
  //     console.log(this.state.aa, '=--ddcc')
  //   })
  // }
  componentWillUpdate(nextprops: any, prevprops: any) {
    console.log(this.state.val, 'willupdate')
    console.log(nextprops, prevprops)
  }
  shouldComponentUpdate(nextprops: any, prevprops: any) {
    console.log(this.state.val, 'shouldupdate')
    console.log(nextprops, prevprops)
    return true
  }
  componentDidMount() {
    // this.setState({ val: this.state.val + 1 })
    // this.setState({ val: this.state.val + 1 })
    this.setState({ val: 99999 })
    console.log('didmount')
  }
  componentDidUpdate(nextprops: any, prevprops: any) {
    console.log(this.state, 'didupdate')
    console.log(nextprops, prevprops)
  }
  render() {
    console.log('render', this.state) // 输出更新前的值 --> 1
    return (
      <div className="home-component-root">
        <p>{this.state.title}</p>
        <p>{this.props.name}</p>
        <Button val={this.state.val} onClick={this.handlerclick} />
      </div>
    )
  }
  handlerclick = () => {
    this.setState({ val: this.state.val + 1 })
  }
}
export default Home
