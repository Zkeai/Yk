import {Avatar, Card,Tooltip} from "antd";
import  '../CardInfo/index.less'
const CardInfo = ({avatar,value,style,tip}: API.cardInfo)=>{
  return (
    <>
      <Tooltip placement="right" title={tip}>
      <Card
        style={{height:'9vh'}}
        className={'card'}
        hoverable
      >

          <Avatar className={'avatar'}  src={avatar} size={30} shape={'square'}/>
          <div className={'value'} style={style}>{value}</div>
      </Card>
      </Tooltip>
    </>
  )
}

export default CardInfo;
