
import { db } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const pitches = await db.pitches.findMany(p => p.status === 'active');
            const users = await db.users.findMany();

            const result = pitches.map(p => {
                const founder = users.find(u => u.id === p.founder_id);
                return {
                    ...p,
                    first_name: founder?.first_name || 'Unknown',
                    last_name: founder?.last_name || 'Founder'
                };
            }).reverse();

            res.status(200).json(result);
        } catch (error) {
            console.error("Fetch Pitches Error:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const userPayload = verifyToken(token);
        if (!userPayload || userPayload.role !== 'founder') {
            return res.status(403).json({ message: 'Forbidden: Founders only' });
        }

        const {
            title, problem, solution, competition, visuals, branding,
            interview, story, socials, isHighEffort, teaserMode,
            campaignDuration, pricePerSale
        } = req.body;

        try {
            const newPitch = await db.pitches.create({
                founder_id: userPayload.userId,
                title: title || '',
                problem,
                solution,
                competition,
                visuals,
                branding: branding || ['#8B5CF6', '#3B82F6'],
                interview,
                story,
                socials,

                // Dashboard compatibility
                assets: ['images', 'scripts'],
                emoji: '🚀',
                commission: 20,

                // Normalize fields
                is_high_effort: isHighEffort || false,
                teaser_mode: teaserMode || false,
                campaign_duration: campaignDuration || 21,
                price_per_sale: pricePerSale || 50,
                status: 'active'
            });

            res.status(201).json(newPitch);
        } catch (error) {
            console.error("Create Pitch Error:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
