import React from 'react';

export default (props: any) => {

    let numbers = [];
    for (let x = 0; x < props.pagination.pages; x++) {
        numbers.push(false)
    }
    return (
        <div className={'row page-picker'}>

            <div className={'col-12'}>
                <div className={'numbers-holder'}>
                    {
                        numbers.map((item, index) => {
                            return (
                                <div
                                    className={`number-holder ${(index === props.pagination.page - 1) ? 'selected-number' : ''}`}
                                    key={`page_picker_${index + 1}`}
                                    onClick={() => props.changePage(index + 1)}>{index + 1}</div>
                            )
                        })

                    }
                </div>
            </div>
        </div>
    )
};


