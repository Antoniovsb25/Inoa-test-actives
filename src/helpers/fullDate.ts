    const date = new Date();
    const year = date.getFullYear().toString().padStart(2, '0');
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const fullDate: string = `${year}-${month}-${day}`;
    export default fullDate;