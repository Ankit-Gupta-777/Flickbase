const AccessControl = require('accesscontrol'); 


const allRights = {
    'create:any':['*'],
    'read:any':['*'],
    'delete:any':['*'],
    'update:any':['*']

} 

let grantsObject = {
    admin:{
        test:allRights,
        profile:allRights,
        categories:allRights,
        articles:allRights

        // test:{
        //     'read:any':['*']
        // }
        
    }, 
    user:{
        test:{
            'read:any':['*']
        },
        profile:{
            'read:own':['*','!password','!id'],
            'update:own':['*','!password','id']
        },
        //Users are not allowed to do anything with CATEGORIES
        articles:{
            'read:any':['*']
        }

    }
}

const roles = new AccessControl(grantsObject);

module.exports = {roles};