var myRegex = /(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))$/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNum: '0',
      formula: '',
      total: ''
    }
    this.numPress = this.numPress.bind(this);
    this.opPress = this.opPress.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);    
  }
  numPress(e) {
    if (e.target.value !== '0'){
      //non0 passed to curretNum
      this.setState({
        currentNum: parseFloat(this.state.currentNum.concat(e.target.value)).toString()
      });
    } else if (e.target.value == '0' && this.state.currentNum == '0') {
      // attempted to add multiple 0s to a 0
      return;
    } else if (e.target.value == '0' && this.state.currentNum.includes('.0') == false) {
      //adding 0s to a decimal
      this.setState({
        currentNum: this.state.currentNum + '0'
      });
    } 
  };

  opPress(e) {
    if (myRegex.test(this.state.formula) == true && e.target.value !== '-' && this.state.currentNum == '0' || this.state.currentNum == '-0') {
      //overwrite previous operator
      this.setState({
        formula: this.state.formula.slice(0, -1).concat(e.target.value),
        currentNum: this.state.currentNum.replace('-', '')
      });
    }  
    
    else if (this.state.currentNum === '0' && e.target.value === '-') {
        //currentNum made negative
        this.setState({
          currentNum: '-' + this.state.currentNum
        });
      }

    else if (this.state.currentNum !== '0') {
      //saved to formula
      this.setState({
        formula: this.state.formula + this.state.currentNum + e.target.value,
        currentNum: '0',
        total: ''
        });
      }
  }; 

  handleDecimal() {
    if (this.state.currentNum.includes('.') == false ){
      //append a . to num if no . present
      this.setState({ currentNum: this.state.currentNum.concat('.') }) 
    }
  }

  equals() {
    //variable to turn double negatives to positives in string
    var tot = (this.state.formula + this.state.currentNum).replace('--', '+');
    this.setState({
      total: eval(tot).toString(),
      currentNum: eval(tot).toString(),
      formula: '',
      currentOp: ''
    })
    //sets total and current num to the received number, resets formula and current op
  };

  clear() {
    //resets all states
    this.setState({
      currentNum: '0',
      formula: '',
      total: ''
    })
  };

  render() {
    return (
      <div>
         <Formula 
          currentNum = {this.state.currentNum}
          currentOp = {this.state.currentOp}
          formula = {this.state.formula}
          /><br></br>
        <Output 
          currentNum = {this.state.currentNum}
          currentOp = {this.state.currentOp}
          total = {this.state.total}
        /><br></br>
        <Buttons 
          equals = {this.equals}
          clear = {this.clear}
          numPress = {this.numPress}
          opPress = {this.opPress}
          handleDecimal = {this.handleDecimal}
        />
        <Footer />
      </div>
    );
  }
};

class Buttons extends React.Component {
  render() {
    return (
      <div class='container'>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="multiply"
            onClick={this.props.opPress}
            value="*"
          >
            *
          </button>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="divide"
            onClick={this.props.opPress}
            value="/"
          >
            /
          </button>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="subtract"
            onClick={this.props.opPress}
            value="-"
          >
            -
          </button>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="decimal"
            onClick={this.props.handleDecimal}
            value="."
          >
            .
          </button><br></br>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="seven"
            onClick={this.props.numPress}
            value="7"
          >
            7
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="eight"
            onClick={this.props.numPress}
            value="8"
          >
            8
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="nine"
            onClick={this.props.numPress}
            value="9"
          >
            9
          </button><br></br>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="four"
            onClick={this.props.numPress}
            value="4"
          >
            4
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="five"
            onClick={this.props.numPress}
            value="5"
          >
            5
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="six"
            onClick={this.props.numPress}
            value="6"
          >
            6
          </button>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="add"
            onClick={this.props.opPress}
            value="+"
          >
            +
          </button><br></br>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="one"
            onClick={this.props.numPress}
            value="1"
          >
            1
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="two"
            onClick={this.props.numPress}
            value="2"
          >
            2
          </button>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="three"
            onClick={this.props.numPress}
            value="3"
          >
            3
          </button><br></br>
          <button          
            type="button" 
            class="btn btn-light fs-5"
            id="zero"
            onClick={this.props.numPress}
            value="0"
          >
            0
          </button>
          <button 
            type="button" 
            class="btn btn-danger fs-5"
            id="clear"
            onClick={this.props.clear}
            value="AC"
          >
            AC
          </button>
          <button
            type="button" 
            class="btn btn-secondary fs-5"
            id="equals"
            onClick={this.props.equals}
            value="="
          >
            =
          </button>
      </div>
        );
    }
};

class Output extends React.Component {
  render() {
    return (
      <div className="outputScreen" id="display">
        {this.props.currentNum}
        {this.props.currentOp}
      </div>
    );
  }
}
class Formula extends React.Component {
  render() {
    return <div className="formulaScreen">
      {this.props.formula}
      {this.props.total}
    </div>;
  }
}
class Footer extends React.Component {
  render() {
    return <div id='footer'>
      Designed by <a href='https://github.com/augustineus?tab=repositories' target='_blank'>Tim Ortega</a> <i class="fa-brands fa-github"></i>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));