import { AutoExchange } from '@revolut/icons'
import React from 'react';
import styled from 'styled-components';
import { revolutGrey10, RevolutTopBarBlack10, revolutWhite, secondaryBold } from '../../styles/variables';


const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    height: 77px;
    max-heigh: 77px;
    background-color: ${RevolutTopBarBlack10};
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: grey;
    color: ${revolutWhite};
    font-weight: ${secondaryBold};
    font-size: 24px;
    padding:0 25px;
    
`

const Title = styled.span`
    flex-grow: 0.67;
    align-self: center;
    text-align: right;

`

const AutoExchangeWrapper = styled.div`
    display: flex;
    align-self: center;
    flex-grow: 0.33;
    justify-content: flex-end;
    & > span {
        color: ${revolutGrey10};
        padding-right: 15px;
    }
`
const TopBar = () => {
    return (
        <Wrapper>
        <Title>Exchange</Title>
        <AutoExchangeWrapper><span>Auto </span><AutoExchange color='primary' size='32'/></AutoExchangeWrapper>
        </Wrapper>
    )
}

export default TopBar;