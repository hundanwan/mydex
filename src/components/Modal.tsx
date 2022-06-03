import '../css/Modal.css'
import ListToken from './ListToken'

interface propsType {
    closeModal: any,
    tokens: Object,
    currentSelectSide: string,
    setFromSelect: any,
    setToSelect: any
}
export default function Modal(props: propsType) {
    const tokenList: object[] = []
    //循环存入tokenList
    for (const address in props.tokens) {

        tokenList.push(props.tokens[address])

    }

    //选择token后将选择的token存入currentTrade
    const selectToken = (key: number) => {
        console.log(tokenList[key])
        if (props.currentSelectSide === 'from') {
            props.setFromSelect(tokenList[key])
        } else {
            props.setToSelect(tokenList[key])
        }
        props.closeModal()
    }
    return (
        <div className='modal-root' >
            <div className='modal-bg' onClick={() => { props.closeModal() }}></div>
            <div className='modal-container'>
                <header className='modal-header'>
                    <span>Select Token</span>
                    <svg className="icon" aria-hidden="true" onClick={() => { props.closeModal() }}>
                        <use href="#icon-guanbi"></use>
                    </svg>
                </header>
                <ul id='token-list' className='token-list'>
                    {
                        props.tokens ?
                            tokenList.map((value, index) => {
                                return (
                                    <ListToken key={index} token={value} onClick={selectToken} index={index}></ListToken>

                                )
                            })
                            :
                            <span>Loading</span>
                    }
                </ul>
                <footer></footer>
            </div>
        </div>
    )
}
