import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLangStore } from '../../store/langStore';

import { TrainingSection } from '../../components/TrainingSection/TrainingSection';
import s from './TrainingsPage.module.scss'


interface LocalizedTraining {
    title: string;
    summary: string;
    description: string;
    benefits: string[];
    schedule: string;
}

interface TrainingData {
    category: string;
    icon: string;
    image: string;
    photo: string;
    video: string[];
    ua: LocalizedTraining;
    en: LocalizedTraining;
}

export const TrainingPage: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const [data, setData] = useState<TrainingData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    const { lang } = useLangStore();

    const text: LocalizedTraining | undefined = data
        ? (lang === 'uk' ? data.ua : data.en)
        : undefined;

    useEffect(() => {
        if (!type) {
            setNotFound(true);
            setLoading(false);
            return;
        }

        const loadTrainingData = async (category: string) => {
            try {
                const response = await fetch(`/data/trainings/${category}.json`);
                if (!response.ok) throw new Error('Not found');
                const json = await response.json();
                setData(json);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        loadTrainingData(type);
    }, [type]);

    if (loading) return <div>Завантаження...</div>;
    if (notFound || !data || !text) return <Navigate to="/404" />;

    return (<>
        <div className={s.titleWrapper}>
            <h2 className={s.title}>{text.title}</h2>
        </div>
        <TrainingSection
            category={data.category}
            image={data.image}
            photo={data.photo}
            video={data.video}
            text={text}
        />
    </>
    );
};
