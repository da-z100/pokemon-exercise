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

export const SavedText = styled.p`
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
    color: #367AF6;
    vertical-align: middle;
    margin: 0;
    height: 40px;
`;

export const SaveButton = styled.button`
    width: 100px;
    background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
`;

export const RemoveButton = styled.button`
    width: 100px;
    background-color: #EA4C89;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
`