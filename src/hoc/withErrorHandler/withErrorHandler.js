import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>{
    return props =>{
        const [error, setError] = useState(null);

        
            const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null);
            return req;
            })
            const resInterceptors = axios.interceptors.response.use(res => res, err =>{
                setError(err);
            });

        useEffect(()=> {       
            axios.interceptors.request.eject(reqInterceptors);
            axios.interceptors.response.eject(resInterceptors);
        }, [reqInterceptors, resInterceptors])

      const  errorConfirmedHandler = () => {
            setError(null);
        }

        
        return(
            <React.Fragment>
                <Modal show={error}
                clicked={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
            <WrappedComponent {...props}/>
            </React.Fragment>
        );
        
    }
}

export default withErrorHandler;