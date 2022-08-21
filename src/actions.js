

export const getTable = (params) => {
  return (dispatch) => {
    const result = fetch('https://kiselev.su/test/dme/users.php?page='+params.page+'&sort='+params.sort+'&fio='+params.fio+'&dobfrom='+params.dobfrom+'&dobto='+params.dobto+'&results=10', {});
    result.then(response => response.json()).then((res)=>{console.log(res);dispatch(getTableSuccess(res))}).catch((err)=>{alert(err.message);});
  }
}

const getTableSuccess = (data) => ({
  type: 'SET_TABLE',
  payload: {data}
});