export default function(data)
{
    if(!data)
        return null;
        
    return Object.keys(data).map(key=>{

        return {
            id:key,
            ...data[key]
        };
    });
}
