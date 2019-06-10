#include "main.hpp"

#include <gvc.h>

extern gvplugin_library_t gvplugin_core_LTX_library;
extern gvplugin_library_t gvplugin_dot_layout_LTX_library;
extern gvplugin_library_t gvplugin_neato_layout_LTX_library;

char *errorMessage = NULL;

int vizErrorf(char *buf)
{
    errorMessage = buf;
    return 0;
}

char *vizLastErrorMessage()
{
    return errorMessage;
}

char *vizRenderFromString(const char *src, const char *format, const char *engine)
{
    char *result = NULL;
    GVC_t *context;
    Agraph_t *graph;
    unsigned int length;

    context = gvContext();
    gvAddLibrary(context, &gvplugin_core_LTX_library);
    gvAddLibrary(context, &gvplugin_dot_layout_LTX_library);
    gvAddLibrary(context, &gvplugin_neato_layout_LTX_library);

    agseterr(AGERR);
    agseterrf(vizErrorf);

    agreadline(1);

    while ((graph = agmemread(src)))
    {
        if (result == NULL)
        {
            gvLayout(context, graph, engine);
            gvRenderData(context, graph, format, &result, &length);
            gvFreeLayout(context, graph);
        }

        agclose(graph);

        src = "";
    }
    return result;
}

const char *Main::doLayout(const char *dotStr, const char *formatStr, const char *engineStr)
{
    return vizRenderFromString(dotStr, formatStr, engineStr);
}

//  Include JS Glue  ---
#include "main_glue.cpp"
