type MenuDataType = {
    id: number;
    title: string;
    link: string;
    open: boolean;
    logged?: boolean;
}

export const MenuData:Array<MenuDataType> = [
{
    id: 1,
    title: 'Home',
    link: '/',
    open: false,
    logged: false,
},
{
    id: 2,
    title: 'Revisão',
    link: '/#service',
    open: false,
    logged: false,
},
{
    id: 3,
    title: 'Contato',
    link: '/#contact',
    open: false,
    logged: false,
},
{
    id: 4,
    title: 'Agendamentos',
    link: '/#shedule',
    open: false,
    logged: true,
},
{
    id: 5,
    title: 'Editar Dados',
    link: '/#profile',
    open: false,
    logged: true,
},
{
    id: 5,
    title: 'Editar Foto',
    link: '/#change-photo',
    open: false,
    logged: true,
},
{
    id: 5,
    title: 'Editar Senha',
    link: '/#chance-password',
    open: false,
    logged: true,
}
];

