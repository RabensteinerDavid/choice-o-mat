import React, { Component } from 'react'
import styled from 'styled-components'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        const { questionID } = this.props; // Hier erhältst du die questionID als Prop

        return (
            <Container>
                <Nav>
                    <Links questionID={questionID} /> {/* Übergeben der questionID an die Links-Komponente */}
                </Nav>
            </Container>
        )
    }
}

export default NavBar
