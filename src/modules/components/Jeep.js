/*
 * @Author: Nokey 
 * @Date: 2017-10-24 19:11:19 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-10-24 19:13:04
 */
'use strict'; 

import './jeep.styl'

class Jeep extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='car'>
                    <div className='top'>
                        <div className='roof'></div>
                        <div className='window'>
                            <div className='shade'></div>
                            <div className='mirror'></div>
                            <div className='chairs'>
                                <div className='chair-left'></div>
                                <div className='chair-right'></div>
                            </div>
                        </div>
                        <div className='side-mirrors'></div>
                        <div className='hood'></div>
                    </div>
                    <div className='bottom'>
                        <div className='head-lights'>
                            <div className='bulbs'></div>
                        </div>
                        <div className='side-lights'>
                            <div className='bulbs'></div>
                        </div>
                        <div className='grill'></div>
                        <div className='bumper'>
                            CGTN
                        </div>
                    </div>
                </div>
                <div className='wheels'></div>
                <div className='underbelly'></div>
            </div>
        );
    }
}

export default Jeep;