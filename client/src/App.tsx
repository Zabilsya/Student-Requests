import React, {FC} from 'react';
import browserHistory from './routes/history'
import CustomRouter from './routes/CustomRoute';
import useProfile from "./hooks/useProfile";
import useRoutes from "./routes/useRoutes";


const App: FC = () => {
    const { userType, isLoadingProfile } = useProfile()
    const routes = useRoutes(userType)

    if (isLoadingProfile) {
        return <></>
    }

    return (
      <CustomRouter history={browserHistory}>
          {routes}
      </CustomRouter>
    );
}

export default App
