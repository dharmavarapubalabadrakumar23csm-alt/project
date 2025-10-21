import { useEffect, useState } from 'react';

function App() {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    async function fetchList() {
        const r = await fetch('http://localhost:5001/api/greetings');
        const j = await r.json();
        setList(j);
    }

    useEffect(() => { fetchList(); }, []);

    async function submit(e) {
        e.preventDefault();
        if (!name.trim()) return alert('Enter name');
        await fetch('http://localhost:5001/api/greetings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        setName('');
        fetchList();
    }

    return ( <
        div style = {
            {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg,#0f172a,#0ea5a0)',
                color: '#fff',
                fontFamily: 'Segoe UI'
            }
        } >
        <
        div style = {
            { width: 360, background: 'rgba(255,255,255,0.06)', padding: 24, borderRadius: 12, boxShadow: '0 8px 30px rgba(2,6,23,0.6)' }
        } >
        <
        h2 style = {
            { marginTop: 0 }
        } > Professional React Frontend < /h2> <
        p > Type your name and click Greet < /p> <
        form onSubmit = { submit } >
        <
        input value = { name }
        onChange = { e => setName(e.target.value) }
        placeholder = "Your name"
        style = {
            { width: '100%', padding: 10, borderRadius: 8, border: 'none', marginBottom: 10 }
        }
        /> <
        button style = {
            { width: '100%', padding: 10, borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }
        } > Greet < /button> < /
        form > <
        hr style = {
            { border: 'none', height: 1, background: 'rgba(255,255,255,0.08)', margin: '16px 0' }
        }
        /> <
        div style = {
            { maxHeight: 200, overflow: 'auto' }
        } > {
            list.map(g => ( <
                div key = { g._id }
                style = {
                    { padding: 8, borderBottom: '1px solid rgba(255,255,255,0.03)' }
                } >
                <
                strong > { g.name } < /strong><div style={{fontSize:12,opacity:0.8}}>{new Date(g.createdAt).toLocaleString()}</div >
                <
                /div>
            ))
        } <
        /div> < /
        div > <
        /div>
    );
}

export default App;