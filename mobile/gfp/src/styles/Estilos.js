// Cor principal (roxo)
export const CorPrincipal = '#6A0DAD'; // ou '#800080' para um roxo mais clássico

// Cor secundária (cinza claro)
export const CorSecundaria = '#D3D3D3'; // ou '#A9A9A9' para cinza escuro

// Cor de destaque (mantendo o vermelho ou pode alterar também)
export const CorTerciaria = '#FF0000'; // opcional: '#E91E63' (rosa forte) ou '#FFC107' (amarelo destaque)


const EStilo ={
    conteudo: {
        backgroundColor: CorPrincipal,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
      },
   
    botao: {
        padding: '15px 30px',
        fontSize: '16px',
        backgroundColor: '#8e44ad', // tom de roxo
        color: '#fff',
        border: 'none',
        borderRadius: '50px', // redondo
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    texto: {
        marginTop: '15px',
        color: '#555',
    },
    logoImagem: {
        width: '120px',
        height: 'auto',
        marginBottom: '30px',
        borderRadius: '20px', // se quiser um canto arredondado
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
}

export default EStilo