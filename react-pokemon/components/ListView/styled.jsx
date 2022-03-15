import styled from 'styled-components';

export const SearchInput = styled.input`
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    outline: transparent solid 2px;
    outline-offset: 2px;
    position: relative;
    appearance: none;
    transition-property: 1rem;
    transition-duration: 200ms;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    border-width: 1px;
    border-style: solid;
    font-family: Inter,sans-serif;

    &:focus {
        border-color: rgb(49, 130, 206);
        box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
    }
`;

export const ListItemDisplay = styled.div`
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #ccc;
    transition: all 0.25s linear;
    width: 17vw;
    margin: 5px;
    display: flex;
    justify-content: center;

    &:hover{
        box-shadow: 0px 0px 5px #0077c5;
    }
`;

export const ListItemTitle = styled.h2`
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    font-weight: bold;
`;

export const LoadingBar = styled.div`
    width: 100%;
    height: 30px;
`;
