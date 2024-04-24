import React, { Component } from 'react'
import styled from 'styled-components'
import Arrows from './Arrows'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

class FotBar extends Component {
    render() {
        const { prevQuestion, nextQuestion } = this.props;
        return (
            <Container>
                <Nav>
                <Arrows prevQuestion={prevQuestion} nextQuestion={nextQuestion} />
                </Nav>
            </Container>
        )
    }
}

export default FotBar