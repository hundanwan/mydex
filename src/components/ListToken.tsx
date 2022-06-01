

interface propsType {
    token: any,
    onClick: any,
    index: any,
}
export default function ListToken(props: propsType) {

    const clickToken = () => {
        props.onClick(props.index)
    }
    return (
        <ol onClick={() => { clickToken() }}>
            <img className='token-list-img' src={props.token.logoURI} alt=''>
            </img>
            <div className='token-list-text'>
                <span className='token-list-symbol'>{props.token.symbol}</span>
                <span className='token-list-name'>{props.token.name}</span>
            </div>

        </ol>
    )
}
