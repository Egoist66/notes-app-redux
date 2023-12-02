import React, {FC, memo} from "react";
import {Collapse, QRCode, Typography} from 'antd';
import {infoItems} from "../../info-page-data/info-data";


const style = `
    
    body,html {
      user-select: none;
    }
   
    h2 {
     color: #001529;
    
    }
    
 `


const Info: FC = () => {
    const {Text} = Typography

    return (
        <div id={'info'}>
            <style>{style}</style>


            <h2>Использование:</h2>


            <p>
                Это приложение позволит вам в режиме реального
                времени создавать, удалять, переименовывать, а так же
                менять статус выполнения задачи. Так же доступны специальные фильтры для
                управления задачами. После перезагрузки страницы ваши данные не потеряются.
                <br/><br/>
                Для того что создать задачу - просто заполните поле и нажмите клавишу <code><b>Enter</b></code>
            </p>

            <h2 style={{textAlign: 'center'}}>Список Изменений</h2>

            <Collapse
                accordion
                items={infoItems}
                defaultActiveKey={['1']}
            />


            <Text style={{paddingBottom: 50, paddingTop:50, display: 'block'}} underline type={'secondary'}>
                Просканируйте QR код приложения чтобы иметь возможность быстро открывать на других устройствах
            </Text>

            <div>

                <QRCode className="qr" value={document.location.href}/>

            </div>


        </div>
    )
}

export default memo(Info)