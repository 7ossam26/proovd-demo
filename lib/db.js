
import fs from 'fs';
import path from 'path';

// Robust path resolution
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure DB exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
    const initialData = { users: [], pitches: [], matches: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

function readDb() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("DB Read Error:", err);
        return { users: [], pitches: [], matches: [] };
    }
}

function writeDb(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("DB Write Error:", err);
    }
}

export const db = {
    users: {
        findMany: async (predicate) => {
            const { users } = readDb();
            return predicate ? users.filter(predicate) : users;
        },
        findOne: async (predicate) => {
            const { users } = readDb();
            return users.find(predicate);
        },
        create: async (user) => {
            const data = readDb();
            const newId = (data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) : 0) + 1;
            const newUser = {
                ...user,
                id: newId,
                created_at: new Date().toISOString()
            };
            data.users.push(newUser);
            writeDb(data);
            return newUser;
        }
    },
    pitches: {
        findMany: async (predicate) => {
            const { pitches } = readDb();
            return predicate ? pitches.filter(predicate) : pitches;
        },
        create: async (pitch) => {
            const data = readDb();
            const newId = (data.pitches.length > 0 ? Math.max(...data.pitches.map(p => p.id)) : 0) + 1;
            const newPitch = {
                ...pitch,
                id: newId,
                created_at: new Date().toISOString()
            };
            data.pitches.push(newPitch);
            writeDb(data);
            return newPitch;
        }
    }
};
